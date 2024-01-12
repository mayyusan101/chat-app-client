import api from "../services/apiService";

const fetchAllUsersFromDB = async () => {
  try {
    const response = await api('/users');
      return response.data.data.users;
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw error;
  }
};

const fetchAllRoomsFromDB = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching rooms data:", error);
    throw error;
  }
};

// send message
const postMessageToDB = async ({ message, conversationId }) => {
  try {
    const response = await api.post(
      '/messages',
      {
        message,
        conversationId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching message data:", error);
    throw error;
  }
};

// room one
const fetchRoomConversationFromDB = async (roomId) => {
  try {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room chat data:", error);
    throw error;
  }
};

// chat one
const fetchChatConversationFromDB = async (receiverId) => {
  try {
    const response = await api.post(
      '/chat',
      {
        userId: receiverId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat data:", error);
    throw error;
  }
};

const createRoomToDB = async ({ roomName, users }) => {
  try {
    const response = await api.post(
      '/rooms',
      {
        roomName,
        users,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching create room data:", error);
    throw error;
  }
};

const leaveRoomToDB = async ({ roomId }) => {
  try {
    const response = await api.post(
      '/rooms/leave',
      {
        roomId
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching leave room data:", error);
    throw error;
  }
};

const removeRoomToDB = async ({ roomId }) => {
  try {
    const response = await api.post(
      '/rooms/remove',
      {
        roomId
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching leave room data:", error);
    throw error;
  }
};

const logout = async (userId) => {
  try {
    const response = await api.post(
      '/auth/logout',
      {
        userId: userId
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching leave room data:", error);
    throw error;
  }
};

const setUserAratarToDB = async(image) => {
  try {
    const response = await api.post(
      '/users/set-avatar',
      {
        image: image
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error set user avatar:", error);
    throw error;
  }
}

export { fetchAllUsersFromDB, fetchChatConversationFromDB, postMessageToDB, fetchAllRoomsFromDB, createRoomToDB, fetchRoomConversationFromDB, leaveRoomToDB, removeRoomToDB, logout, setUserAratarToDB };
