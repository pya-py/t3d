import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

// put token in all request headers:
axios.interceptors.request.use( config => {
    const token = sessionStorage.getItem("token");
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    else
        config.headers.Authorization = null;
    // console.log(config.headers.Authorization);
    return config;
}, error => {
    // what to do?
    return Promise.reject(error);
});
// what the f should i do?
// (() => {
//     const token = sessionStorage.getItem("token");
//     if (token)
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     else {
//         delete axios.defaults.headers.common["Authorization"];
//         /*if setting null does not remove `Authorization` header then try     
//               delete axios.defaults.headers.common['Authorization'];
//             */
//     }
//     console.log("token", token);
// })();

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
