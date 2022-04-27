import React, { useState, useEffect } from "react";

const SelectorProvider = React.createContext();

const SelectorContext = (props) => {
    const [ catToShow, setCatToShow ] = useState("All")
    const [ sourceToShow, setSourceToShow ] = useState("All")

    useEffect(() => {
        console.log(`SelectorContext : catToShow: ${catToShow}, sourceToShow: ${sourceToShow}`)
    }, [catToShow, sourceToShow])

    return (
        <SelectorProvider.Provider 
            value={{
                catToShow, setCatToShow,
                sourceToShow, setSourceToShow
            }}
            children={props.children}
        />
    );
}

export { SelectorContext, SelectorProvider};