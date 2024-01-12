import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { createRoomToDB } from "../../api/api";
import socket from "../../services/socketService";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CloseIcon, CreateRoomIcon } from "../../utils/import";

export const CreateRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const animatedComponents = makeAnimated();
  const allUsers = useSelector((state) => state.chatUsers.allUsers); // reterive allUsers from store
  const currentUser = useAuthContext();

  const options = allUsers.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => {
    setSelectedOptions([]);
    setIsModalOpen(false);
    setRoomName("");
  };
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      // get all users ids
      const selectedUserIds = selectedOptions.map((value) => ({
        id: value.value,
      }));
      const response = await createRoomToDB({
        roomName,
        users: [...selectedUserIds, currentUser._id],
      });
      onCloseModal(); // close modal
      // socket
      socket.emit("roomChat", {
        roomName: roomName,
        userId: currentUser._id,
        roomId: response.data._id,
        membersIds: selectedUserIds,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex text-white items-center justify-between max-h-[40px]">
        <h2 className="text-xl font-medium">CreateRoom</h2>
        <button
          type="button"
          onClick={onOpenModal}
          className="flex justify-center bg-red-500 hover:bg-red-600 text-white rounded-full text-sm px-3 py-2 md:px-5 md:py-2.5 text-center"
        >
          <CreateRoomIcon />
        </button>
      </div>

      {/* Main modal */}
      <div
        className={`fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center ${
          isModalOpen ? "flex" : "hidden"
        }`}
      >
        {/* Modal OverLay */}
        <div
          className={`absolute inset-0 w-screen h-screen bg-[#232323] opacity-50`}
          onClick={onCloseModal}
        ></div>
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-bgModal rounded-lg shadow dark:bg-bgModal">
            <div className="flex items-center justify-between p-4 md:p-5rounded-t">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Room Chat
              </h3>
              <button
                type="button"
                onClick={onCloseModal}
                className="end-2.5 text-gray-400 bg-transparent  hover:bg-bgChat rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              >
                <CloseIcon w={3} h={3} />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <hr className="w-[90%] h-[1px] my-0 mx-auto bg-white" />
            {/* Modal body */}
            <div className="p-4 md:p-5 md:pt-4">
              <form className="space-y-4" onSubmit={handleSubmitForm}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    id="name"
                    className="bg-bgChat border border-slate-300 text-white text-sm rounded-lg outline-none block w-full p-2.5 "
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Members
                  </label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    onChange={(selectedValues) => setSelectedOptions(selectedValues)}
                    options={options}
                    value={selectedOptions}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:bg-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create Room
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
