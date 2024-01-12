import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: undefined,
  isRoom: false,
  users: [],
  createdAt: undefined,
  updatedAt: undefined,
  roomAdmin: undefined,
  name: undefined,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState, // conversation data
  reducers: {
    setConversation: (state, action) => {
      const response = action.payload;
      state._id = response._id;
      state.isRoom = response.isRoom;
      state.users = response.users;
      state.createdAt = response.createdAt;
      state.updatedAt = response.updatedAt;
      state.roomAdmin = response?.roomAdmin; // undefine for chat user
      state.name = response?.name; // undefine for chat user
    },
    clearConversation: (state, _action) => {
      state._id = undefined;
      state.isRoom = false;
      state.users = [];
      state.roomAdmin = undefined;
      state.name = undefined;
      state.createdAt = undefined;
      state.updatedAt = undefined;
    },
  },
});

export const selectConversation = (state) => state.conversation;

export const selectConversationId = (state) => state.conversation._id;

export const { setConversation, clearConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
