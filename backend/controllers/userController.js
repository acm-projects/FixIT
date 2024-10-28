const User = require('../models/userModel');
const mic = require('mic');
const { OpenAI } = require('openai');
const { TranscribeStreamingClient, StartStreamTranscriptionCommand } = require('@aws-sdk/client-transcribe-streaming');

const transcribeStreamingClient = new TranscribeStreamingClient({ 
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const getUser = async (req, res) => {
    const {username} = req.params;

    const user = await User.findOne({username});

    if (!username)
        return res.status(404).json({error: 'No such user'});

    res.status(200).json(user);
}

const createNewUser = async (req, res) => {
    const {username, password, email, firstName, lastName, yearClassification, major, posts} = req.body;
    try {
        const newUser = await User.create({username, password, email, firstName, lastName, yearClassification, major, posts});
        res.status(200).json({mssg: 'User created', user: newUser});
        console.log(`User ${newUser.username} was created.`);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
}

const deleteUser = async (req, res) => {
    const {username} = req.params;

    const user = await User.findOne({username});

    if (!username)
        return res.status(404).json({error: 'No such user'});

    res.status(200).json({mssg: 'User deleted', user: username});
    console.log(`User ${user.username} was deleted.`);
}

const updateUser = async (req, res) => {
    const {username} = req.params;
    
    const user = await User.findOneAndUpdate({username: username}, {...req.body}, {new: true});

    if (!user)
        return req.status(400).json({error: 'No such user'});

    res.status(200).json({mssg: 'User information was updated', user: user});
    console.log(`${user.username}'s information was updated.`);
}

const getAllPostsByUser = async (req, res) => {
    const {username} = req.params;

    const posts = await User.findOne({username}).select('posts -_id').populate({
        path: 'posts',
        select: '-_id'
    });

    if (!username)
        return res.status(404).json({error: 'No such user'});

    res.status(200).json(posts);
}

const chatWithBot = async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage)
        return res.status(400).json({error: 'You must send a message!'})

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." }, // helps establish the role or behavior that the model should adopt during the conversation
                { role: "user", content: userMessage }
            ],
        });

        const botMessage = completion.choices[0].message.content;
        res.status(200).json({ reply: botMessage });
    
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const transcribeAudio = async (req, res) => {
    const micInstance = mic({
        rate: '16000',
        channels: '1',
        debug: false,
        exitOnSilence: 6,
    });

    const micInputStream = micInstance.getAudioStream();

    micInputStream.on('data', async (data) => {
        console.log('Received audio data of length:', data.length);

        if (data.length === 0) {
            console.error('Received empty audio data.'); // Log if no data is received
            return;
        }

        if (!req.transcribing) { // Only create a new transcription session if the previous one is not done
            req.transcribing = true; // transcription has started

            const params = {
                LanguageCode: 'en-US',
                MediaSampleRateHertz: 16000,
                MediaEncoding: 'pcm',
                AudioStream: micInputStream,
            };

            try {
                const response = await transcribeStreamingClient.send(new StartStreamTranscriptionCommand(params));
                console.log('Transcription Response:', response);

                const transcriptionStream = response.TranscriptResultStream;

                for await (const transcriptionData of transcriptionStream) {
                    if (transcriptionData.Transcript && transcriptionData.Transcript.Results.length > 0) {
                        const results = transcriptionData.Transcript.Results.map(result => {
                            if (result.Alternatives && result.Alternatives.length > 0) {
                                return {
                                    transcript: result.Alternatives[0].Transcript,
                                    isPartial: result.IsPartial,
                                };
                            } else {
                                console.warn('No alternatives found in result');
                                return { transcript: '', isPartial: result.IsPartial };
                            }
                        });
                        res.write(JSON.stringify(results));
                    }
                }
            } catch (error) {
                console.error('Error during transcription:', error);
                res.status(500).json({ error: 'Error during transcription' });
            } finally {
                req.transcribing = false; // reset transcription flag
            }
        }
    });

    micInputStream.on('error', (err) => {
        console.error('Audio stream error:', err);
        res.status(500).json({ error: 'Audio stream error.' });
    });

    micInstance.start();
    console.log('Microphone started.');

    req.on('end', () => { // stop transcription on request end
        micInstance.stop();
        console.log('Microphone recording stopped.');
        res.end();
    });
};

module.exports = {
    getUser,
    createNewUser,
    deleteUser,
    updateUser,
    getAllPostsByUser,
    chatWithBot,
    transcribeAudio,
}
