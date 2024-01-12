import {
  Conversation,
  ChatInput,
  ConversationHeader,
} from "../../utils/import";
import { useEffect } from "react";
import socket from "../../services/socketService";
import { useDispatch, useSelector } from "react-redux";
import { setLatestMessage } from "../../store/features/chatUsersSlice";
import { useAuthContext } from "../../hooks/useAuthContext";
import { sendMessage } from "../../store/features/messageSlice";

export const Chat = () => {
  const conversation = useSelector((state) => state.conversation);
  const currentUser = useAuthContext();
  const dispatch = useDispatch();

  // socket
  useEffect(() => {
    // listen for chat message
    socket.on("sendMessage", ({ senderId, text }) => {
      const message = {
        text: text,
        sender: senderId,
        _id: Math.random(10000),
        createdAt: Date.now(),
      };
      dispatch(sendMessage(message)); // store to messages array
      dispatch(setLatestMessage({ userId: senderId, message })); // set as latest message in one to one chat
    });
    // listen for room message
    socket.on("roomMessage", ({ senderId, text }) => {
      if (senderId !== currentUser._id) {
        const message = {
          text: text,
          sender: senderId,
          _id: Math.random(10000),
          createdAt: Date.now(),
        };
        dispatch(sendMessage(message));
      }
    });
  }, [currentUser._id, dispatch]);

  return (
    <main className="p-5 min-h-screen ">
      <div className="w-full h-[calc(100vh-40px)] relative flex flex-col border-[0.1px] rounded-3xl pl-5 pr-2  border-slate-200 bg-bgChat">
        {conversation._id ? (
          <>
            <ConversationHeader />
            <div className="flex-1 overflow-y-auto">
              <Conversation />
            </div>
            <ChatInput />
          </>
        ) : (
          <div className="w-full h-full pr-3 flex items-center justify-center">
            <h2 className="text-3xl text-white block">Open Chat</h2>
          </div>
        )}
      </div>
    </main>
  );
};
