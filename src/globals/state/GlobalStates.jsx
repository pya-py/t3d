import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import GlobalContext from './GlobalContext';
const GlobalStates = ({children}) => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
    const isSmartPhone = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = !isDesktop && !isSmartPhone;
    const [device, setDevice] = useState(null);
    console.log("runned");//s
    useEffect(() => {
        // find device mode
        // array is sorted according to Configs.Devices
        setDevice(
            [isDesktop, isTablet, isSmartPhone].findIndex((mode) => mode)
        ); //return the index of the one that is true -> wich is the curret device mode
    }, [isDesktop, isTablet, isSmartPhone]);

    return ( 
        <GlobalContext.Provider value={{device}}>
            {children}
        </GlobalContext.Provider>
     );
}
 
export default GlobalStates;