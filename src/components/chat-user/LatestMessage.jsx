import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export const LatestMessage = ({ chatUserName, message }) => {
  const currentUser = useAuthContext();
  const [text, setText] = useState("");

  useEffect(() => {
    let displayText = "";
    if (Object.keys(message).length === 0) {
      // chat if message is empty or not
      displayText = `Say Hii to ${chatUserName}`;
    } else {
      displayText =
        message.sender === currentUser._id
          ? `You: ${message.text}`
          : `${message.text}`;
    }
    setText(displayText);
  }, [message, chatUserName, currentUser._id]);
  return (
    <>
      <p className="text-xs">{text && text}</p>
    </>
  );
};
