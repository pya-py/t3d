import http from "./httpService";
import { BrowserStorage, Routes } from "./configs";

const userServices = {
    signUp: (user) => {
        return http.post(
            `${Routes.Root}/${Routes.Users}/${Routes.SignUp}`,
            JSON.stringify(user)
        );
    },
    signIn: (user) => {
        return http.post(
            `${Routes.Root}/${Routes.Users}/${Routes.SignIn}`,
            JSON.stringify(user)
        );
    },
    getPlayer: (userID) => {
        return http.get(
            `${Routes.Root}/${Routes.Users}/${Routes.Public}/${userID}`
        );
    },
    getMyCredentials: () => {
        //token will be sent automatically, o.w. method doesnt return anything
        return http.get(`${Routes.Root}/${Routes.Users}/${Routes.Credentials}`);
    },
    editMyCredentials: (newMe) => {
        return http.put(
            `${Routes.Root}/${Routes.Users}/${Routes.Credentials}`,
            JSON.stringify(newMe)
        );
    },
    changeMyPassword: (passwords) => {
        return http.put(
            `${Routes.Root}/${Routes.Users}/${Routes.Credentials}/${Routes.PasswordChange}`,
            JSON.stringify(passwords)
        );
    },
    getAllPlayers: () => {
        return http.get(`${Routes.Root}/${Routes.Users}/${Routes.Public}`);
    },
    saveUser: (id, token) => {
        // use remember me option
        sessionStorage.setItem(BrowserStorage.ID, id); // localStorage or sessionStorage?
        sessionStorage.setItem(BrowserStorage.Token, token);
    },
    isAdministrator: (userID) => {
        return http.get(
            `${Routes.Root}/${Routes.Users}/${Routes.Administrators}/${userID}`
        );
    }, // check is admin via token? or this?:|
    readUserID: () => {
        //from browser
        // consider local storage
        return sessionStorage.getItem(BrowserStorage.ID);
    },
};

export default userServices;
