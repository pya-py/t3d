//browser storage keywords
const KeyToken = "ptk",
    KeyID = "pid";

module.exports = {
    writeUser: (id, token) => {
        // use remember me option
        sessionStorage.setItem(KeyID, id); // localStorage or sessionStorage?
        sessionStorage.setItem(KeyToken, token);
    },
    TOKEN: () => sessionStorage.getItem(KeyToken),
    ID: () => sessionStorage.getItem(KeyID),
};
