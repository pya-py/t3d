import { createContext } from "react";

const GlobalContext = createContext({
    device: 0,
    signOut: () => {},
    goTo: () => {},
    redirectToGamePlay: () => {}
});

export default GlobalContext;