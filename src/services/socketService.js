import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_DOMAIN);

export default socket;
