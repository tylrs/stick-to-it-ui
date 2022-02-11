import { useEffect, useState } from "react";
import "./Message.css";

const Message: React.FC<{message:string}> = ({ message }) => {

    return (
        <>
            {message && 
                <div className="message-container">
                    {message}
                </div>}
        </>
    )
}

export default Message