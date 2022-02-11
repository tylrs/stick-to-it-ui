import { useEffect, useState } from "react";
import "./Message.css";

const Message: React.FC<{message:string}> = ({ message }) => {

    return (
        <>
            {message && <h4 className="message-text">{message}</h4>}
        </>
    )
}

export default Message