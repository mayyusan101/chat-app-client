import { useState } from "react";
import { setUserAratarToDB } from "../../api/api";
import { getUser, setUser } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import notify from "../../utils/notify";

// shaffle profile pic
function getRandomArray(min, max, count) {
  let shaffleArray = [];
  while (shaffleArray.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // randomly generate
    if (!shaffleArray.includes(randomNumber)) {
      shaffleArray.push(randomNumber);
    }
  }
  return shaffleArray;
}

export const ProfilePicker = () => {
  const [profileArray, setProfileArray] = useState(getRandomArray(1, 10, 4));
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const currentUser = getUser();
  const navigate = useNavigate();

  const setProfileAvatar = async () => {
    if (!selectedIndex) return; // if not selected
    const image = `avatar-${selectedIndex}.png`;
    try {
      await setUserAratarToDB(image);
      currentUser.profile = image;
      setUser(currentUser); // set profile

      navigate("/", { replace: true }); // goto home page
    } catch (err) {
      console.log(err);
      notify({ type: "error", message: err.response.data.message });
    }
  };

  return (
    <div className="w-screen h-screen bg-bgSidemenu flex flex-col gap-6 items-center justify-center text-bgChattype">
      <h1 className="text-3xl md:text-5xl p-4 sm:pb-10 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
        Choose Your Profile
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {profileArray &&
          profileArray.map((el) => (
            <div
              className={`w-28 h-28 rounded-full overflow-hidden ${
                selectedIndex == el ? "border-4 border-red-400" : ""
              }`}
              onClick={() => setSelectedIndex(el)}
              key={el}
            >
              <img
                src={`/images/users/avatar-${el}.png`}
                alt=""
                className="w-full h-full  object-cover object-center"
              />
            </div>
          ))}
      </div>
      <div>
        <button
          className="border-none outline-none py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600"
          onClick={setProfileAvatar}
        >
          Setup Avatar
        </button>
      </div>
    </div>
  );
};
