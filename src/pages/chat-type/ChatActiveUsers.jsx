import { useSelector } from "react-redux";
import { ActiveChat, SearchBar } from "../../utils/import";
import { useEffect, useState } from "react";

export const ChatActiveUsers = () => {
  const onlineUsers = useSelector((state) => state.chatUsers.onlineUsers);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(onlineUsers); // display all active users
  }, [onlineUsers]);

  const handleSerachUsers = (users) => {
    setUsers(users); // display searched users
  };
  const handleClearSerach = () => setUsers(onlineUsers);

  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4 py-3 px-4 md:p-4">
      <SearchBar
        users={onlineUsers}
        onSearchUsers={handleSerachUsers}
        onClearSearch={handleClearSerach}
      />
      <hr />
      <div className="flex-1 rounded-2xl overflow-hidden">
        <div className="bg-bgChattype w-full max-h-[100%] rounded-2xl  overflow-y-auto scrollbar-hide">
          {users.map((user) => (
            <ActiveChat key={user._id} chatUser={user} />
          ))}
        </div>
      </div>
    </div>
  );
};
