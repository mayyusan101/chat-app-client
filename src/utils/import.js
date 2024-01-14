import { ErrorPage } from "../pages/error/ErrorPage";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { ProfilePicker } from "../pages/profile-picker/ProfilePicker";
import { ChatUsers } from "../pages/chat-type/ChatUsers";
import { ChatRooms } from "../pages/chat-type/ChatRooms";
import { ChatActiveUsers } from "../pages/chat-type/ChatActiveUsers";
import { DesktopSidebar } from "../components/DesktopSidebar";
import { MobileFooter } from "../components/MobileFooter";
import { Chat } from "../pages/chat/Chat";
import { Conversation } from "../components/conversation/Conversation";
import { ConversationHeader } from "../components/conversation/ConversationHeader";
import { ChatInput } from "../components/conversation/ChatInput";
import { Message } from "../components/conversation/Message";
import { SearchBar } from "../components/shared/SearchBar";
import { PersonChat } from "../components/chat-user/PersonChat";
import { RoomChat } from "../components/room-chat/RoomChat";
import { CreateRoom } from "../components/room-chat/CreateRoom";
import { LatestMessage } from "../components/chat-user/LatestMessage";
import { ActiveChat } from "../components/chat-user/ActiveChat";
import { MyProfile } from "../components/shared/MyProfile";
import { ChatIcon } from "../components/ui/icons/ChatIcon";
import { UsersGroupIcon } from "../components/ui/icons/UsersGroupIcon";
import { TwoUsersIcon } from "../components/ui/icons/TwoUsersIcon";
import { TrashIcon } from "../components/ui/icons/TrashIcon";
import { LeaveIcon } from "../components/ui/icons/LeaveIcon";
import { SentIcon } from "../components/ui/icons/SentIcon";
import { CreateRoomIcon } from "../components/ui/icons/CreateRoomIcon";
import { CloseIcon } from "../components/ui/icons/CloseIcon";
import { usePublicRote } from "../hooks/usePublicRote";

export {
  ErrorPage,
  Login,
  Register,
  ProfilePicker,
  ChatUsers,
  ChatRooms,
  ChatActiveUsers,
  Conversation,
  DesktopSidebar,
  MobileFooter,
  Chat,
  ConversationHeader,
  ChatInput,
  Message,
  SearchBar,
  PersonChat,
  RoomChat,
  CreateRoom,
  MyProfile,
  LatestMessage,
  ActiveChat,
  ChatIcon,
  UsersGroupIcon,
  TwoUsersIcon,
  TrashIcon,
  LeaveIcon,
  SentIcon,
  CreateRoomIcon,
  CloseIcon,
  usePublicRote,
};

export const defaultUserProfile = "/images/default-user.png"; // absolute path
