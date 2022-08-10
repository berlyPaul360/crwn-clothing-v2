import { createContext,useState } from "react";


// as the actual value I want to access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null
});

export const UserProvider=({ childeren }) =>{
    const [currentUser,setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser};
    return(
        <UserContext.Provider value ={value}> 
            {childeren}
        </UserContext.Provider>
    );

}