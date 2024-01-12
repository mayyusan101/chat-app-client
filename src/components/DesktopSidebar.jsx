import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { logout } from "../api/api";
import { removeToken, removeUser } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { ChatIcon, LeaveIcon, MyProfile, TwoUsersIcon, UsersGroupIcon } from "../utils/import";

export const DesktopSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [active, setActive] = useState(undefined);
  const currentUser = useAuthContext();
  const navigate = useNavigate();
  
  // for home route => active users
  useEffect(() => {
    (currentPath === '/')? setActive('/'): setActive(undefined);
  },[currentPath]);

  const handleLogout = async() => {
    removeToken(); // clear token in localStorage
    removeUser();  // clear user date in localStorage
    await logout(currentUser._id);
    navigate("/login"); // redirect to login page
  };

  return (
    <header className="hidden relative md:block md:py-4 w-full h-full bg-bgSidemenu text-white">
      {/* Profile  */}
      <MyProfile />
      {/* Links */}
      <nav id="sidebar" className="flex flex-col justify-between items-center gap-2">
        <NavLink to="/users" className={`w-full cursor-pointer text-center py-2 px-0 ${active==='/' ? 'active': ''}`} >
          <div className="desktop__link flex justify-start gap-1 ps-2 items-center">
            <ChatIcon w={6} h={6}/>
            <span>Chats</span>
          </div>
        </NavLink>
        <NavLink to="/rooms" className="w-full cursor-pointer text-center py-2 px-0" >
          <div className="desktop__link flex justify-start gap-1 ps-2 items-center">
            <UsersGroupIcon w={6} h={6}/>
            <span>Rooms</span>
          </div>
        </NavLink>
        <NavLink to="/active" className="w-full cursor-pointer text-center py-2 px-0" >
          <div className="desktop__link flex justify-start gap-1 ps-2 items-center">
            <TwoUsersIcon w={6} h={6}/>
            <span>Active</span>
          </div>
        </NavLink>
      </nav>
      {/* Logout */}
      <div className="absolute bottom-8 left-0 w-full px-4 flex flex-col items-center">
        <hr className="mb-2 h-1 w-full"/>
        <div title="logout" onClick={handleLogout} className="flex items-center justify-center p-2 rounded-full hover:bg-red-500 hover:text-white cursor-pointer">
          <LeaveIcon w={5} h={5}/>
        </div>
      </div>
    </header>
  )
}

