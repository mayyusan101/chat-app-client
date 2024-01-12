import { configureStore } from "@reduxjs/toolkit";
import chatUsersReducer from "./features/chatUsersSlice";
import conversationReducer from "./features/conversationSlice";
import messageReducer from "./features/messageSlice";

export const store = configureStore({
  reducer: {
    chatUsers: chatUsersReducer,
    conversation: conversationReducer,
    messages: messageReducer,
  },
});
