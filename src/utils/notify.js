import { toast } from "react-toastify";

const notify = (payload = {type: "success", message: "default notify message"}) =>  {
    toast[payload.type](payload.message, 
        {position: toast.POSITION.TOP_RIGHT});
};

export default notify;