import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced'
import Header from "@/components/customHeader"
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm"
import Ai from '@/components/customMessageForms/Ai'
import AiCode from '@/components/customMessageForms/AiCode'
import AiAssist from '@/components/customMessageForms/AiAssist'

const Chat = ({user, secret}) => {

    // props for Chat; gives us authentication 
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID, 
        user, //"testuser", 
        secret, //"1234"
    )

    return (
        <div style={{flexBasis: "100%"}}> 
        
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow {...chatProps} 
            style={{height: "100vh"}}
            renderChatHeader={(chat) => <Header chat={chat}/>}
            renderMessageForm = {(props) => {
                if (chatProps.chat?.title.startsWith("AiChat_")){ 
                    //console.log("This is AiChat");
                    return <Ai props={props} activeChat={chatProps.chat}/>
                }
                if(chatProps.chat?.title.startsWith("AiCode_")){
                    //console.log("This is AiCode chat")
                    return <AiCode props={props} activeChat={chatProps.chat}/>
                }
                if(chatProps.chat?.title.startsWith("AiAssist_")){
                    //console.log("This is AiAssist chat")
                    return <AiAssist props={props} activeChat={chatProps.chat}/>
                }
                //console.log("This is normal chat");
                return (<StandardMessageForm props={props} activeChat={chatProps.chat}/>)
            }}
            />
        </div>
    )
}

export default Chat; 
