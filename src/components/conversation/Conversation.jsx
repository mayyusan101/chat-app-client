import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../utils/import";
import { useEffect, useRef } from "react";
import socket from "../../services/socketService";
import { clearConversation } from "../../store/features/conversationSlice";
import { leaveRoom } from "../../store/features/chatUsersSlice";

export const Conversation = () => {
  const scrollRef = useRef();
  const conversationRef = useRef();
  const messages = useSelector((state) => state.messages.messages);
  const conversationId = useSelector((state) => state.conversation._id);
  const dispatch = useDispatch();
  
  // for message auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // listen for room chat remove by admin
    socket.on("roomRemove", ({ roomId }) => {
      if (conversationId === roomId) {
        dispatch(clearConversation()); // if member in group chat and admin remove that group chat
      }
      dispatch(leaveRoom(roomId));
    });
  }, [conversationId, dispatch]);

  return (
    <div
      className="flex-1 flex flex-col gap-1 mt-2 w-full "
      ref={conversationRef}
    >
      {messages &&
        messages.map((message) => (
          <div key={message._id} ref={scrollRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};
