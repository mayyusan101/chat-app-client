import { useSelector } from "react-redux";
import { PersonChat, SearchBar } from "../../utils/import";
import { useEffect, useState } from "react";

export const ChatUsers = () => {
  const allUsers = useSelector((state) => state.chatUsers.allUsers); // reterive all users from store
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(allUsers); // display all users
  }, [allUsers]);

  const handleSerachUsers = (users) => {
    setUsers(users); // display searched users
  };
  const handleClearSerach = () => setUsers(allUsers);

  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4 py-3 px-4 md:p-4">
      <SearchBar
        users={allUsers}
        onSearchUsers={handleSerachUsers}
        onClearSearch={handleClearSerach}
      />
      <hr />
      <div className="flex-1 rounded-2xl overflow-hidden">
        <div className="bg-bgChattype w-full max-h-[100%] rounded-2xl  overflow-y-auto scrollbar-hide">
          {users.map((user) => (
            <PersonChat key={user._id} chatUser={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

{
  /* <h1 className="h-24 border-b border-red-400 p-2 mb-1">Hello</h1>
<h1 className="h-24 border-b border-red-400 p-2 mb-1">Hello</h1>
<h1 className="h-24 border-b border-red-400 p-2 mb-1">Hello</h1>
<h1 className="h-24 border-b border-red-400 p-2 mb-1">Hello</h1>
<h1 className="h-24 border-b border-red-400 p-2 mb-1">Hello</h1>    
<h1 className="h-24 border-b border-red-400 p-2 mb-1">Hello</h1>
<h1 className="h-24 border-b border-red-400 p-2 mb-1">Hello</h1>    
<h1 className="h-24 border-b border-red-400 p-2 mb-1">Hello</h1>
<h1 className="h-24 border-b border-red-400 p-2 mb-1">Hello</h1>     */
}
