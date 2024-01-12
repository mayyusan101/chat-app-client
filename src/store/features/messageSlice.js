import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload || [];
    },
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const selectMessages = (state) => state.messages.messages;

export const { setMessages, sendMessage } = messageSlice.actions;

export default messageSlice.reducer;
