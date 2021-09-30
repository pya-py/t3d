import http from "./httpService";
import { BrowserStorage, Routes } from "../configs";

const {Server} = Routes;

const userServices = {
    signUp: (user) => {
        return http.post(
            `${Server.Root}/${Server.Users}/${Server.SignUp}`,
            JSON.stringify(user)
        );
    },
    signIn: (user) => {
        return http.post(
            `${Server.Root}/${Server.Users}/${Server.SignIn}`,
            JSON.stringify(user)
        );
    },
    getPlayer: (userID) => {
        return http.get(
            `${Server.Root}/${Server.Users}/${Server.Public}/${userID}`
        );
    },
    getAllPlayers: () => {
        return http.get(`${Server.Root}/${Server.Users}/${Server.Public}`);
    },
    getMyCredentials: () => {
        //token will be sent automatically, o.w. method doesnt return anything
        return http.get(`${Server.Root}/${Server.Users}/${Server.Credentials}`);
    },
    editMyCredentials: (newMe) => {
        return http.put(
            `${Server.Root}/${Server.Users}/${Server.Credentials}`,
            JSON.stringify(newMe)
        );
    },
    changeMyPassword: (passwords) => {
        return http.put(
            `${Server.Root}/${Server.Users}/${Server.Credentials}/${Server.PasswordChange}`,
            JSON.stringify(passwords)
        );
    },
    getMyFriends: () => {
        return http.get(`${Server.Root}/${Server.Users}/${Server.Credentials}/${Server.Friends}`);
    },
    isMyFriend: (targetID) => {
        return http.get(
            `${Server.Root}/${Server.Users}/${Server.Credentials}/${Server.Friends}/${targetID}`
        );
    },
    isAdministrator: (userID) => {
        return http.get(
            `${Server.Root}/${Server.Users}/${Server.Administrators}/${userID}`
        );
    }, // check is admin via token? or this?:|
    saveUser: (id, token) => {
        // use remember me option
        sessionStorage.setItem(BrowserStorage.ID, id); // localStorage or sessionStorage?
        sessionStorage.setItem(BrowserStorage.Token, token);
    },
    readUserID: () => {
        //from browser
        // consider local storage
        return sessionStorage.getItem(BrowserStorage.ID);
    },
};

export default userServices;