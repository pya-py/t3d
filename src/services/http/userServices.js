import http from "./httpService";
import { Routes } from "../configs";

const {Server} = Routes;

const userServices = {
    signUp: (user) => {
        return http.post(
            `${Server.Root}/${Server.Users}/${Server.SignUp}`,
            JSON.stringify(user)
        );
    },
    signIn: (user) => {
        console.log(`${Server.Root}/${Server.Users}/${Server.SignIn}`);
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
    }
};

export default userServices;