import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(null, (error) => {
    const STATUS = { AUTHENTICATION_INVALID: 401, INPUT_INVALID: 422 };
    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (error.response.status === STATUS.AUTHENTICATION_INVALID) {
        toast.error("شماره دانشجویی یا رمز عبور نادرست است", {
            position: "top-right",
            closeOnClick: true,
        });
    } else if (error.response.status === STATUS.INPUT_INVALID) {
        toast.error("فرمت ورودی نادرست است", {
            position: "top-right",
            closeOnClick: true,
        });
    } else if (!expectedErrors) {
        // console.log(error);
        toast.error("مشکلی از سمت سرور رخ داده است.", {
            position: "top-right",
            closeOnClick: true,
        });
    }

    return Promise.reject(error);
});

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default http;