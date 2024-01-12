import { useSelector } from "react-redux";
import { CreateRoom, RoomChat } from "../../utils/import";

export const ChatRooms = () => {
  const allRooms = useSelector((state) => state.chatUsers.allRooms); // reterive all rooms from store

  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4 py-3 px-4 md:p-4">
      <CreateRoom />
      <hr />
      <div className="flex-1 rounded-2xl overflow-hidden">
        <div className="bg-bgChattype w-full max-h-[100%] rounded-2xl  overflow-y-auto scrollbar-hide">
          {allRooms.map((room) => (
            <RoomChat key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};
