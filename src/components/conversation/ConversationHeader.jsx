import { LeaveIcon, TrashIcon, defaultUserProfile } from "../../utils/import";
import { useDispatch, useSelector } from "react-redux";
import { clearConversation } from "../../store/features/conversationSlice";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import socket from "../../services/socketService";
import { leaveRoomToDB, removeRoomToDB } from "../../api/api";
import { leaveRoom } from "../../store/features/chatUsersSlice";

export const ConversationHeader = () => {
  const dispatch = useDispatch();
  const handleGoBack = () => {
    dispatch(clearConversation());
  };
  const conversation = useSelector((state) => state.conversation);
  const onlineUsers = useSelector((state) => state.chatUsers.onlineUsers);
  const currentUser = useAuthContext();
  
  const [name, setName] = useState("");
  const [online, setOnline] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (conversation.isRoom === true) {
      let roomName = conversation.name;
      if (roomName.length > 25) {
        roomName = roomName.slice(0, 25).concat("..."); // cut if name is too long
      }
      setName(roomName); // display room name
      setOnline(false);
      if (conversation.roomAdmin._id === currentUser._id) {
        setIsAdmin(true); // admin user
      } else {
        setIsAdmin(false); // member user
      }
    } else {
      const chatUser = conversation?.users[0]; // display chat user name
      setName(chatUser.name);
      // check user is online or not
      const userId = conversation?.users[0]._id;
      const isExist = onlineUsers?.find((user) => user._id == userId);
      isExist ? setOnline(true) : setOnline(false);
    }
  }, [currentUser._id, conversation, onlineUsers]);

  const emitSocketMessage = () => {
    socket.emit("roomRemove", {
      // room message
      senderId: currentUser._id,
      roomId: conversation._id,
    });
  };

  // leave room
  const handleLeaveRoom = async () => {
    if (conversation.isRoom === true) {
      const roomId = conversation._id;
      dispatch(clearConversation()); // clear conversation
      dispatch(leaveRoom(roomId));
      await leaveRoomToDB({
        roomId: roomId,
      });
    }
  };
  // delete room if user is admin
  const handleRemoveRoom = async () => {
    if (conversation.isRoom === true && isAdmin) {
      const roomId = conversation._id;
      dispatch(clearConversation()); // clear conversation
      emitSocketMessage(); //emit to other users
      dispatch(leaveRoom(roomId)); // remove in local
      await removeRoomToDB({
        roomId: roomId,
      });
    }
  };

  return (
    <div className="py-1 md:py-3 flex items-center justify-between border-b border-slate-200">
      <div className="flex items-center">
        <div
          onClick={handleGoBack}
          className="py-2 -ms-3 flex items-start md:hidden cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        {/* For User Profiles */}
        <div className=" flex ps-5">
          {conversation.users.slice(0, 3).map((user) => (
            <div key={user._id} className="-ms-4">
              <img
                src={
                  user.profile
                    ? `/images/users/${user.profile}`
                    : defaultUserProfile
                }
                alt="avatarlogo"
                className="w-8 h-8  md:w-11  md:h-11 rounded-full"
              />
            </div>
          ))}
        </div>
        <div className="ms-3 text-white">
          <h1 className="text-xl leading-4 md:leading-normal md:text-2xl font-semibold ">
            {name}
          </h1>
          {!conversation.isRoom && (
            <p className="text-sm">{online ? "online" : "offline"}</p>
          )}
        </div>
      </div>
      {/* Action Buttons  */}
      {conversation.isRoom && (
        <div className="flex flex-col items-start justify-start gap-1 text-white pr-3">
          <div
            onClick={() => (isAdmin ? handleRemoveRoom() : handleLeaveRoom())}
            className="flex gap-2 justify-center items-center md:gap-3"
          >
            <div className="text-sm flex justify-center items-center w-14 p-2  cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full">
              {conversation.isRoom && (
                <>
                  {isAdmin ? (
                    <TrashIcon w={5} h={5} />
                  ) : (
                    <LeaveIcon w={5} h={5} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
