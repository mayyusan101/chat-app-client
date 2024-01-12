import { Outlet } from "react-router-dom";
import { Chat, DesktopSidebar, MobileFooter} from "./utils/import";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from './store/store';
import { AuthContextProvider } from './context/AuthContext';
import { getUser } from './utils/localStorage.js';
import { useEffect } from "react";
import { fetchAllRoomsFromDB, fetchAllUsersFromDB } from "./api/api.js";
import { setAllRooms, setAllUsers, setOnlineUsers } from "./store/features/chatUsersSlice.js";
import socket from "./services/socketService.js";
import { ToastContainer } from "react-toastify";
import "./app.css";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const conversation = useSelector(state => state.conversation);
  const dispatch = useDispatch();
  const currentUser = getUser();

  useEffect(() => {
    const fetchUsers = async() => {
      const users = await fetchAllUsersFromDB(); // fetch users
      dispatch(setAllUsers(users)); // set all users to store
      return users;
    }
    const fetchRooms = async() => {
      const rooms = await fetchAllRoomsFromDB(); // fetch rooms
      dispatch(setAllRooms(rooms)); // set all rooms to store
      return rooms;
    }
    fetchUsers(); // initial fetch users
    fetchRooms(); // initial fetch rooms
  
    socket.emit("userConnected", currentUser._id);
    socket.on("connectedUsers", async(connectedUsersArray) => {
      await fetchUsers(); // refetch users
      dispatch(setOnlineUsers(connectedUsersArray)); // set online users in store
    });  
    socket.on("roomChat", async() => {
      await fetchRooms(); // refetch rooms
    });
  }, [currentUser._id, dispatch]);

  return (
    <>
      <Provider store={store}>
        <AuthContextProvider value={getUser() || null}>
        <ToastContainer />
        <div className="w-screen h-screen overflow-hidden bg-gray-200 flex flex-col-reverse md:flex-row ">
          <div className="md:h-full md:w-[120px] ">
            <DesktopSidebar />
            <MobileFooter />
          </div>
          {/* Chats Start*/}
            <div className={`bg-bgChattype h-[calc(100vh-40px)] md:h-full md:w-[250px] lg:w-[300px]  ${conversation._id ? 'hidden md:block': 'block'}`}>
              <Outlet />
            </div>
          {/* Chats End*/}
          <div className={`bg-bgChattype h-screen md:flex-1 z-10 md:block  ${conversation._id ? 'block': 'hidden'}`}>
            <Chat />
          </div>
        </div>
        </AuthContextProvider>
      </Provider>
    </>
  )
}

export default App
