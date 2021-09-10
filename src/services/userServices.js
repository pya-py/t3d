import http from "./httpService";
import config from "./config.json";

const userServices = {
    signUp: (user) => {
        return http.post(
            `${config.localRoot}/${config.usersRoute}/${config.signupRoute}`,
            JSON.stringify(user)
        );
    },
    signIn: (user) => {
        return http.post(
            `${config.localRoot}/${config.usersRoute}/${config.signinRoute}`,
            JSON.stringify(user)
        );
    },
    getPlayer: (userID) => {
        return http.get(`${config.localRoot}/${config.usersRoute}/${userID}`);
    },
    getAllPlayers: () => {
        return http.get(`${config.localRoot}/${config.usersRoute}`);
    },
    updateRecords: (userID, gameStatus) => {
        return http.put(
            `${config.localRoot}/${config.usersRoute}/${userID}`,
            JSON.stringify({gameStatus})
        );
    },
    saveUser: (id, token) => {
        // use remember me option
        sessionStorage.setItem("uid", id); // localStorage or sessionStorage?
        sessionStorage.setItem("token", token);
    },
    readUserID: () => {
        // consider local storage
        return sessionStorage.getItem("uid");
    },
};

export default userServices;
