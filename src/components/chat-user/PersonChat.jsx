import { useDispatch, useSelector } from "react-redux";
import { fetchChatConversationFromDB } from "../../api/api";
import { setConversation } from "../../store/features/conversationSlice";
import { setMessages } from "../../store/features/messageSlice";
import { LatestMessage } from "./LatestMessage";
import { defaultUserProfile } from "../../utils/import";
import { useEffect, useState } from "react";

export const PersonChat = ({ chatUser }) => {
  const dispatch = useDispatch();
  const [online, setOnline] = useState(false);
  const userId = chatUser._id;
  const onlineUsers = useSelector((state) => state.chatUsers.onlineUsers);
  useEffect(() => {
    const isExist = onlineUsers?.find((user) => user._id == userId);
    isExist ? setOnline(true) : setOnline(false);
  }, [onlineUsers, userId]);
  const startConveration = async () => {
    try {
      const response = await fetchChatConversationFromDB(chatUser._id);
      dispatch(setConversation(response.data)); // set conversation data to store
      dispatch(setMessages(response.messages.messages)); // set messages to store
    } catch (error) {
      console.log(error);
    }
  };

  const userAvatar = chatUser.profile
    ? `/images/users/${chatUser.profile}`
    : defaultUserProfile;

  return (
    <div
      onClick={startConveration}
      className="bg-bgEachChat h-20 text-slate-100 cursor-pointer"
    >
      <div className="flex items-center gap-4 py-2 px-4 ">
        <div className="relative">
          <img
            src={userAvatar}
            alt="avatarlogo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
          />
          {/* Active Light */}
          { online && <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></div>}
        </div>
        <div className="border-b border-slate-200 flex-1 pb-3 flex flex-col">
          <h2 className="text-base font-semibold">{chatUser.name}</h2>
          {chatUser.lastMessage ? (
            <LatestMessage
              chatUserName={chatUser.name}
              message={chatUser.lastMessage}
            />
          ) : (
            <p>Say hii to {chatUser.name}</p>
          )}
        </div>
      </div>
    </div>
  );
};
