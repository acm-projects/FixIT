const User = require('../models/userModel');
const mic = require('mic');
// const { spawn } = require('child_process');
// const soxPath = 'C:\Program Files (x86)\sox-14-4-2';
// const soxProcess = spawn(soxPath, ['-b', '16', '--endian', 'little', '-c', '1', '-r', '16000', '-e', 'signed-integer', '-t', 'waveaudio', 'default', '-p']);
const { OpenAI } = require('openai');
const { TranscribeStreamingClient, StartStreamTranscriptionCommand } = require('@aws-sdk/client-transcribe-streaming');
const dotenv = require('dotenv');

const TranscribeStreamingClient = new TranscribeStreamingClient({ region: AWS_REGION });
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

     micInputStream.on('data', (data) => {
        const params = {
            LanguageCode: 'en-US',
            MediaSampleRateHertz: 16000,
            MediaEncoding: 'pcm', // or 'wav'
            AudioStream: data
        }

        transcribeService.startStreamTranscription(params, (err, data) => {
            if (err) {
                console.error('Error during transcription:', err);
                return res.status(500).json({error: 'Error during transcription'});
            }
            transcriptionResults.push(...data.Transcript.Results.map(result => result.Alternatives[0].Transcript));
        });
    });

    micInputStream.on('end', () => {
        res.json({ transcription: transcriptionResults.join(' ') }); // when streaming ends, send the transcriptions back
    });

    micInstance.start();
    console.log('Recording and transcribing...');

    setTimeout(() => {
        micInstance.stop();
        console.log('Stopped recording.');
    }, 10000); // stop after 10 seconds
}


module.exports = {
    getUser,
    createNewUser,
    deleteUser,
    updateUser,
    getAllPostsByUser,
    chatWithBot,
    transcribeAudio
}
