//browser storage keywords
const KeyToken = "ptk";
module.exports = {
    save: (token) => {
        // use remember me option
        sessionStorage.setItem(KeyToken, token);
    },
    reset: () => {
        sessionStorage.clear();
    },
    TOKEN: () => sessionStorage.getItem(KeyToken),
};
