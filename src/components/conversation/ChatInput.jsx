import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../hooks/useAuthContext";
import socket from "../../services/socketService";
import { sendMessage } from "../../store/features/messageSlice";
import { setLatestMessage } from "../../store/features/chatUsersSlice";
import { postMessageToDB } from "../../api/api";
import { SentIcon } from "../../utils/import";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const conversation = useSelector((state) => state.conversation);
  const currentUser = useAuthContext();

  const emitSocketMessage = () => {
    if (conversation.isRoom === false) {
      socket.emit("sendMessage", {
        senderId: currentUser._id,
        receiverId: conversation.users[0]._id,
        text: message,
      });
    } else {
      socket.emit("roomMessage", {
        // room message
        senderId: currentUser._id,
        roomId: conversation._id,
        text: message,
      });
    }
  };

  const handleSendMessage = async () => {
    if (!message) return; // no message return
    const msg = {
      text: message,
      sender: currentUser._id,
      _id: Math.random(10000),
      createdAt: Date.now(),
    };
    dispatch(sendMessage(msg)); // append directly in UI(only for chat message)
    if (conversation.isRoom === false) {
      dispatch(
        setLatestMessage({ userId: conversation.users[0]._id, message: msg })
      );
    }
    setMessage(""); // clear text box
    emitSocketMessage(); //emit socket
    await postMessageToDB({
      message: message,
      conversationId: conversation._id,
    });
  };

  return (
    <div className="bg-transparent flex justify-end w-full overflow-hidden sticky bottom-0 right-0 px-0 py-3 sm:p-3">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSendMessage();
        }}
        type="text"
        className="bg-bgMessageText text-white w-full rounded-full py-2 px-4 border-none outline-none "
      />
      <div
        onClick={handleSendMessage}
        className="flex items-center justify-center w-16 h-10 rounded-full ms-2 sm:ms-4 py-1 px-2 bg-red-500 hover:bg-red-600 text-white cursor-pointer"
      >
        <SentIcon w={5} h={5} />
      </div>
    </div>
  );
};
