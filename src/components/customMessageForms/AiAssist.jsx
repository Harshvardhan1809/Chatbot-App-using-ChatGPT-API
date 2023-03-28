import { usePostAiAssistMutation } from '@/state/api';
import React, {useState, useEffect}  from 'react'
import MessageFormUI from './MessageFormUI';

function useDebounce(value, delay){
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return ()=>{
            clearTimeout(handler); 
        }
    // now pass the variables whose change trigger useEffect
    }, [value, delay])

    return debouncedValue; 
}

const AiAssist = ({props, activeChat}) => {

    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [appendText, setAppendText] = useState("");
    
    // to triger the API call and grab the result from the call
    // The first item in the tuple is the "trigger" function and
    // the second element contains an object with status, error, and data.
    const [triggerAssist, resultAssist] = usePostAiAssistMutation(); 

    const handleChange = (e) => setMessage(e.target.value); 
    // asynchronous call to the backend
    const handleSubmit = async () => {
        const date = new Date()
                    .toISOString()
                    .replace("T", " ")
                    .replace("Z", `${Math.floor(Math.random() * 1000 )}+00:00`);
        const at = attachment ? [{blob: attachment, file: attachment.name}] : []; 
        const form = {
            attachments: at, 
            created: date, 
            sender_username: props.username, 
            text: message, 
            activeChatId: activeChat.id, 
        }

        props.onSubmit(form); 
        // send form data to backend
        console.log("Before the trigger function")
        //triggerCode(form);
        setMessage("");
        setAttachment(""); 
    }
    // custom hook which sends the message every 1000ms
    const debouncedValue = useDebounce(message, 1000);

    // if we get the debounced value, we make API call
    useEffect(()=>{
        if(debouncedValue){
            const form = {text: message};
            triggerAssist(form); 
        }
    }, [debouncedValue]) //eslint-disable-line

    const handleKeyDown = (e) => {
        // handle enter and tab (run this function when these both keys are pressed)
        if(e.keyCode === 9 || e.keyCode === 13){
            e.preventDefault();
            setMessage(`${message} ${appendText}`);
        }
        setAppendText(""); 
    }

    useEffect(() => {
        if(resultAssist.data?.text){
            setAppendText(resultAssist.data?.text);
        }
    }, [resultAssist]) //eslint-disable-line

    return (
        <MessageFormUI 
            setAttachment={setAttachment}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}

            appendText={appendText}
            handleKeyDown={handleKeyDown}
        />
    )
}

export default AiAssist; 