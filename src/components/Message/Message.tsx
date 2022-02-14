import "./Message.css";

const Message: React.FC<{message:string}> = ({ message }) => {

    return (
        <>
            {message && 
            <div className="message-container">
                <h4 className="message-text">{message}</h4>
            </div>
            }
        </>
    )
}

export default Message