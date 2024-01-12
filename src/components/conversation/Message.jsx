import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { defaultUserProfile } from "../../utils/import";
import { selectUserById } from "../../store/features/chatUsersSlice";
import { store } from "../../store/store";

export const Message = ({ message }) => {
  const currentUser = useAuthContext();
  const [userAvatar, setUserAvatar] = useState(undefined);
  const isSender = message.sender === currentUser._id ? true : false;

  useEffect(() => {
    if (!isSender) {
      const chatUser = selectUserById(store.getState(), message.sender);
      setUserAvatar(`/images/users/${chatUser.profile}`); // other user
    } else {
      setUserAvatar(`/images/users/${currentUser.profile}`); // current user
    }
  }, [currentUser.profile, isSender, message.sender]);

  return (
    <div
      className={`flex items-start gap-2 w-full ${
        isSender ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <img
        src={userAvatar || defaultUserProfile}
        alt="avatarlogo"
        className="w-7 h-7 md:w-10 md:h-10 rounded-full"
      />
      <div
        className={`bg-bgMessageText ${
          isSender
            ? "rounded-l-xl md:rounded-l-2xl rounded-br-xl md:rounded-br-2xl bg-red-400"
            : "rounded-r-xl md:rounded-r-2xl rounded-bl-xl md:rounded-bl-2xl"
        } py-1 px-2 md:py-2 md:px-4 max-w-[240px] sm:max-w-[300px] md:max-w-[340px]`}
      >
        <span className="text-white break-words text-sm md:text-base">
          {message.text}
        </span>
      </div>
    </div>
  );
};
