import { createContext } from "react";

const GlobalContext = createContext({
    device: 0,
    signOut: () => {}
});

export default GlobalContext;