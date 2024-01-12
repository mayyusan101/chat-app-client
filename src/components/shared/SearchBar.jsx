import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { LeaveIcon, defaultUserProfile } from "../../utils/import";
import { useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "../../utils/localStorage";
import { logout } from "../../api/api";

export const SearchBar = ({ users, onSearchUsers, onClearSearch }) => {
  const [searchText, setSearchText] = useState("");
  const currentUser = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    removeToken(); // clear localStorage
    removeUser(); 
    await logout(currentUser._id);
    navigate("/login"); // redirect to login page
  };

  // clear text
  const clearSearch = () => {
    setSearchText("");
    onClearSearch();
  };
  // search users
  const searchUsers = () => {
    const searchedUsers = users.filter((user) =>
      user.name.includes(searchText)
    );
    onSearchUsers(searchedUsers);
  };

  return (
    <div className="w-full flex justify-between items-center gap-6 px-1">
      <div className="flex justify-center items-center md:hidden">
        <img
          src={
            currentUser.profile
              ? `/images/users/${currentUser.profile}`
              : defaultUserProfile
          }
          alt="avatarlogo"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex-1 flex justify-center items-center relative">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchUsers();
          }}
          className="py-2 px-4 text-sm md:text-base bg-bgSearch w-full border-none outline-none text-slate-100 rounded-full relative"
          placeholder="Search.."
        />
        {/* Clear Text Icon */}
        {searchText && (
          <svg
            onClick={clearSearch}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 absolute top-2 right-4 z-10 text-white cursor-pointer p-1 rounded-full hover:bg-[#696767]"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        )}
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center justify-center p-2 rounded-full bg-red-500 md:hidden"
      >
        <LeaveIcon w={4} h={4} />
      </div>
    </div>
  );
};
