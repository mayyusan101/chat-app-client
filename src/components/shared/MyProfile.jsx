import { useAuthContext } from "../../hooks/useAuthContext"
import { defaultUserProfile } from "../../utils/import";

export const MyProfile = () => {

    const currentUser = useAuthContext();
  return (
    <div className="flex justify-center items-center mb-4">
        <img src={currentUser.profile ? `/images/users/${currentUser.profile}` : defaultUserProfile} alt="avatarlogo" className="w-12 h-12 rounded-full" />
    </div>
  )
}
