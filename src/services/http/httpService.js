import axios from "axios";
import { toast } from "react-toastify";
import { Status, browserStorage } from "../configs";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

// put token in all request headers:
axios.interceptors.request.use(
    (config) => {
        const token = browserStorage.TOKEN();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        else config.headers.Authorization = "";
        // console.log(config.headers.Authorization);
        return config;
    },
    (error) => {
        // what to do?
        return Promise.reject(error);
    }
);
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
    const expectedErrors =
        error.response &&
        error.response.status >= Status.BadRequest && // >= 400
        error.response.status < Status.InternalServerError; // < 500

        //*****notice: */
        //remove some oftheese errors... because they need to be costomized in every use in each components
    // change to switch
    if (error.response.status === Status.BadRequest) {
        toast.error(
            "مشکلی در ارسال درخواست شما به سرور وجود داشت، لطفا دوباره تلاش کنید",
            {
                position: "top-right",
                closeOnClick: true,
            }
        );
    } else if (error.response.status === Status.Unauthorized) {
        toast.error(
            "احراز هویت موفقیت آمیز نبود. لطفا وارد حساب کاربری خود شوید",
            {
                position: "top-right",
                closeOnClick: true,
            }
        );
    } else if (error.response.status === Status.Forbidden) {
        toast.error("شماره دانشجویی یا رمز عبور نادرست است", {
            position: "top-right",
            closeOnClick: true,
        });
    } else if (error.response.status === Status.NotAcceptable) {//or used Locked: 423
        toast.error("این قسمت فقط مختص کاربران ادمین می باشد", {
            position: "top-right",
            closeOnClick: true,
        });
    } else if (error.response.status === Status.Conflict) {
        toast.error(
            "کاربری با این شماره دانشجویی یا ایمیل قبلا ثبت نام کرده است",
            {
                position: "top-right",
                closeOnClick: true,
            }
        );
    }
    else if(error.response.status === Status.SessionExpired){
        toast.error("نشست شما منقضی شده است، لطفا دوباره وارد حساب خود شوید.", {
            position: "top-right",
            closeOnClick: true,
        });
        //redirect to sign in page !
    }
    else if (error.response.status === Status.UnprocessableEntity) {
        toast.error("ورودی شما با استانداردهای سایت مطابقت ندارد", {
            position: "top-right",
            closeOnClick: true,
        });
    } else if (!expectedErrors) {
        // console.log(error);
        toast.error(
            "مشکلی از سمت سرور پیش آمده است ... لطفا لحظاتی بعد دوباره تلاش کنید",
            {
                position: "top-right",
                closeOnClick: true,
            }
        );
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
