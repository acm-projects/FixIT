const User = require('../models/userModel');
const recorder = require('node-record-lpcm16');

const { OpenAI } = require('openai');
const { TranscribeStreamingClient, StartStreamTranscriptionCommand } = require('@aws-sdk/client-transcribe-streaming');

const LanguageCode = "en-US";
const MediaEncoding = "pcm";
const MediaSampleRateHertz = "16000";
const credentials = {
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
};

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
                { // helps establish the role or behavior that the model should adopt during the conversation
                    role: "system", 
                    content: 
                    `
                    You are a helpful assistant.
                    
                    If you get anything related to how to reset the NETID password, refer the user to this article link: https://atlas.utdallas.edu/TDClient/30/Portal/KB/ArticleDet?ID=1262
                    Here are some basic instructions as well on how to do it: 
                    Visit the NETID 

                    For issues regarding connecting to a VPN, redirect users to this article: Install and Connect to GlobalProtect VPN (Windows)
                    
                    For anyone dealing with this error or similar, Error: "Another device on the network is using your computer's IP address" (MacOS), refer users to this article: https://atlas.utdallas.edu/TDClient/30/Portal/KB/ArticleDet?ID=894
                    
                    

                    ` 
                },
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
    recording = recorder.record({
        silence: 3, // duration to wait before stopping due to silence
        threshold: 0.07 // example threshold value (can be adjusted)
    });

    console.log("Recording was started. Press Ctrl+C to stop.")

    recording.stream().on('stop', () => {
        console.log("Recording stopped due to silence.");
    });
    
    recording.stream().on('data', (data) => {
        console.log(`Received audio chunk of size: ${data.length}`);
    });
    const client = new TranscribeStreamingClient({
        region: "us-west-2",
        credentials
    });

    const params = {
        LanguageCode,
        MediaEncoding,
        MediaSampleRateHertz,
        AudioStream: (async function* () {
            for await (const chunk of recording.stream()) {
                yield {AudioEvent: {AudioChunk: chunk}};
            }
        })(),
    };

    const command = new StartStreamTranscriptionCommand(params);
    const response = await client.send(command);

    try {
        for await (const event of response.TranscriptResultStream) {
            if (event.TranscriptEvent) {
                const transcripts = event.TranscriptEvent.Transcript.Results;

                transcripts.forEach(result => {
                    if (result.IsPartial === false) {
                        const transcription = result.Alternatives[0].Transcript; // takes the most accurate transcribed text
                        console.log(`Transcription: ${transcription}`);
                    }
                });
            }
        }
    } catch(err) {
        console.log("error")
        console.log(err)
    }
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
