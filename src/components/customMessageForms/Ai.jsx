import { usePostAiTextMutation } from '@/state/api';
import React, {useState}  from 'react'
import MessageFormUI from './MessageFormUI';

const Ai = ({props, activeChat}) => {

    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    // to triger the API call 
    // The first item in the tuple is the "trigger" function and
    const [trigger] = usePostAiTextMutation(); 

    const handleChange = (e) => setMessage(e.target.value); 
    // asynchronous call to the backend
    const handleSubmit = async () => {
        const date = new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
        const form = {
          attachments: at,
          created: date,
          sender_username: props.username,
          text: message,
          activeChatId: activeChat.id,
        };

        props.onSubmit(form); 
        // send form data to backend
        console.log("Before the trigger function")
        trigger(form);
        setMessage("");
        setAttachment(""); 
    }

    return (
        <MessageFormUI 
            setAttachment={setAttachment}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}

export default Ai; 