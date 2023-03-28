import express from "express";
import axios from "axios"; 
import dotenv from "dotenv"
import {openai} from "../index.js"

dotenv.config();
const router = express.Router();

// If there is any error while posting in chats, 
// check if both the requests are successful

router.post("/text", async (req, res) => {

    try{
        const {text, activeChatId} = req.body; 

        // createCompletion makes call to api for us, pass parameters to response
        // creating response to our message from OPENAI
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt : text,
            temperature: 0.5,
            max_tokens: 2048, 
            top_p : 1,
            frequency_penalty: 0.5, 
            presence_penalty: 0, 
        })

        // make API call to handle submit function
        // manually submitting the reply by making call to API
        // and passing credentials of the user making the reply
        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`, 
            {text: response.data.choices[0].text },        
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID, 
                    "User-Name": process.env.BOT_USER_NAME,
                    "User-Secret": process.env.BOT_USER_SECRET,
                },
            }
        )
        .catch((err) => {
            console.log("Error")
        })
        res.status(200).json({text: response.data.choices[0].text}); 
    }
    catch(error){
        console.log("error", error); 
        res.status(500).json({error: error.message}); 
    }
})

// codex models are deprecated so can't use code-davinci-002
// hence using text-davinci-003 in place of that

router.post("/code", async (req, res) => {

    // at present, the error is coming from the openai library (specifically from the axios on which openai is built)
    // 404 Not Found error is obtained, maybe the URL or syntax for making API calls has changed, hence resource not found

    try{
        const {text, activeChatId} = req.body; 

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt : text,
            temperature: 0.5,
            max_tokens: 2048, 
            top_p : 1,
            frequency_penalty: 0.5, 
            presence_penalty: 0, 
        })

        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`, 
            {text: response.data.choices[0].text },        
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID, 
                    "User-Name": process.env.BOT_USER_NAME,
                    "User-Secret": process.env.BOT_USER_SECRET,
                },
            }
        )
        .catch((err) => {
            console.log("Error")
        })

        res.status(200).json({text: response.data.choices[0].text}); 
    }

    catch(error){
        console.log("error", error); 
        res.status(500).json({error: error.message}); 
    }
})


router.post("/assist", async (req, res) => {

    try{
        const {text, activeChatId} = req.body; //eslint-disable-line

        // createCompletion makes call to api for us, pass parameters to response
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt : `Finish my thought: ${text}`,
            temperature: 0.5,
            max_tokens: 1024, 
            top_p : 1,
            frequency_penalty: 0.5, 
            presence_penalty: 0, 
        })

        // no need to make Axios call since we just want to send a message, 
        // just want to fetch the auto-complete and display it in the UI

        res.status(200).json({ text: response.data.choices[0].text });
    }
    catch(error){
        console.log("error", error); 
        res.status(500).json({error: error.message}); 
    }
})

export default router; 
