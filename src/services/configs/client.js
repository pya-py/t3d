//client routes
// Partial Routes
const Profile = "/Profile",
    ChatRoom = "ChatRoom",
    MyGamesAndFriends = "GamesFriends",
    Notices = "Notices",
    StManagement = "StManagement",
    InfoEdit = "InfoEdit";
module.exports = {
    Root: "/",
    SignUp: "/SignUp",
    SignIn: "/SignIn",
    GameDeck: "/GameDeck",
    Rankings: "/Rankings",
    GameGuide: "/GameGuide",
    ContactUs: "/ContacUs",
    Profile,
    ChatRoom: `${Profile}/${ChatRoom}`,
    MyGamesAndFriends: `${Profile}/${MyGamesAndFriends}`,
    Notices: `${Profile}/${Notices}`,
    StManagement: `${Profile}/${StManagement}`,
    InfoEdit: `${Profile}/${InfoEdit}`
};
