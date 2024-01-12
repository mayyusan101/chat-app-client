import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDispatch } from "react-redux";
import { fetchRoomConversationFromDB } from "../../api/api";
import { setConversation } from "../../store/features/conversationSlice";
import { setMessages } from "../../store/features/messageSlice";
import socket from "../../services/socketService";
import { defaultUserProfile } from "../../utils/import";

export const RoomChat = ({ room }) => {
  const currentUser = useAuthContext();
  const dispatch = useDispatch();

  const fetchConversation = async () => {
    try {
      const response = await fetchRoomConversationFromDB(room._id);
      dispatch(setConversation(response.data)); // set conversation data to store
      dispatch(setMessages(response.messages.messages)); // set messages to store
    } catch (error) {
      console.log(error);
    }
  };
  // socket
  useEffect(() => {
    socket.emit("roomChat", {
      roomName: room.name,
      userId: currentUser._id,
      roomId: room._id,
    });
  }, [currentUser._id, room._id, room.name]);

  const usersCount = room.users.length;
  const maxLength = 25;

  return (
    <div
      onClick={fetchConversation}
      className="bg-bgEachChat h-auto text-slate-100 cursor-pointer"
    >
      <div className="flex items-center gap-4 py-2 px-4 ">
        {/* User Profille */}
        <div
          className={`relative ${
            usersCount < 3 ? "w-12 h-12" : "w-14 h-14 md:w-16 md:h-16"
          } md:w-16 md:h-16 `}
        >
          {room.users && (
            <>
              {room.users[0] && (
                <div className="absolute top-2 left-0">
                  <img
                    src={
                      room.users[0].profile
                        ? `/images/users/${room.users[0].profile}`
                        : defaultUserProfile
                    }
                    alt="avatarlogo"
                    className="w-8 h-8  md:w-10  md:h-10 rounded-full"
                  />
                </div>
              )}
              {room.users[1] && (
                <div className="absolute top-2 right-0">
                  <img
                    src={
                      room.users[1].profile
                        ? `/images/users/${room.users[1].profile}`
                        : defaultUserProfile
                    }
                    alt="avatarlogo"
                    className="w-8 h-8  md:w-10  md:h-10 rounded-full"
                  />
                </div>
              )}
              {room.users[2] && (
                <div className="absolute top-[40%] left-1/4 z-10">
                  <img
                    src={
                      room.users[2].profile
                        ? `/images/users/${room.users[2].profile}`
                        : defaultUserProfile
                    }
                    alt="avatarlogo"
                    className="w-8 h-8  md:w-10  md:h-10 rounded-full"
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className="border-b overflow-hidden whitespace-no-wrap border-slate-200 flex-1 pb-3 flex flex-col">
          <h2 className="text-lg font-semibold">
            {room.name.length > maxLength
              ? `${room.name.slice(0, maxLength)}...`
              : room.name}
          </h2>
        </div>
      </div>
    </div>
  );
};
