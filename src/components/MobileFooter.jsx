import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { ChatIcon, TwoUsersIcon, UsersGroupIcon } from '../utils/import';

export const MobileFooter = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [active, setActive] = useState(undefined);
  const conversation = useSelector(state => state.conversation);

  // for home route => active users
  useEffect(() => {
    (currentPath === '/')? setActive('/'): setActive(undefined);
  },[currentPath]);
  return (
    <nav className={`sticky bottom-0 pt-3 md:hidden bg-bgSidemenu text-white ${conversation._id ? 'hidden': 'block md:hidden'}`}>
       <ul className="flex justify-evenly items-center h-full">
        <NavLink to={"/users"} className={`flex-1 flex justify-center items-center w-full h-full ${active==='/' ? 'active': ''}`}>
          <div className='mobile__link flex justify-center items-center'>
          <ChatIcon w={5} h={5}/>
          </div>
        </NavLink>
        <NavLink to={"/rooms"} className={`flex-1 flex justify-center items-center w-full h-full `}>
          <span className='mobile__link flex justify-center items-center'>
          <UsersGroupIcon w={5} h={5}/>
          </span>
        </NavLink>
        <NavLink to={"/active"} className={`flex-1 flex justify-center items-center h-full `}>
          <span className='mobile__link  flex justify-center w-full items-center'>
          <TwoUsersIcon w={5} h={5}/>
          </span>
        </NavLink>
      </ul>
    </nav>
  )
}
