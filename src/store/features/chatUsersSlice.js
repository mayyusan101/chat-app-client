import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../utils/localStorage";

const initialState = {
  allUsers: [],
  allRooms: [],
  onlineUsers: [],
};
const currentUser = getUser();
const chatUsersSlice = createSlice({
  name: "chatUsers",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload.map((user) =>
        user.lastMessage ? user : { ...user, lastMessage: {} }
      ); // set as latest Message
    },
    setAllRooms: (state, action) => {
      state.allRooms = action.payload;
    },
    setOnlineUsers: (state, action) => {
      const connectedIdsArray = action.payload;
      const connectedIds = {};
      const activeUsers = [];
      state.allUsers.map((user) => {
        const isExist =
          connectedIdsArray.includes(user._id) &&
          !connectedIds.hasOwnProperty(user._id) &&
          user._id !== currentUser?._id;
        if (isExist) {
          activeUsers.push(user);
          connectedIds[user._id] = user.name;
        }
      });
      state.onlineUsers = activeUsers; // set onlide users
    },
    leaveRoom: (state, action) => {
      const roomId = action.payload;
      state.allRooms = state.allRooms.filter((room) => room._id !== roomId);
    },
    setLatestMessage: (state, action) => {
      const { userId, message } = action.payload;
      const index = state.allUsers?.findIndex((user) => user._id === userId);
      // Check if the user with the given userId exists
      if (index !== -1) {
        state.allUsers[index] = {
          ...state.allUsers[index],
          lastMessage: message,
        };
      }
    },
  },
});

export const selectUserById = (state, userId) => {
  const user = state.chatUsers.allUsers.find((user) => user._id === userId);
  return user;
};

export const selectAllUsers = (state) => state.chatUsers.allUsers;

export const selectAllRooms = (state) => state.chatUsers.allRooms;

export const selectOnlineUsers = (state) => state.chatUsers.onlineUsers;

export const {
  setAllUsers,
  setAllRooms,
  setOnlineUsers,
  leaveRoom,
  setLatestMessage,
} = chatUsersSlice.actions;

export default chatUsersSlice.reducer;
