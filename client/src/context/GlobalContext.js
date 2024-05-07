/**
 * @file context/GlobalContext.js
 * @description Global context and provider for managing app-wide state.
 */

import {createContext, useReducer} from 'react'
import globalReducer from './GlobalReducer'



const GlobalContext = createContext();

export const initialState = {
    birds: [],
    stripePromise: null,
    clientSecret: null,
        
}
export const GlobalProvider = ({children}) => {
    

    const [state, dispatch] = useReducer(globalReducer, initialState)

    return <GlobalContext.Provider value={{
        birds: state.birds,
        stripePromise: state.publishableKey,
        clientSecret: state.clientSecret,
        dispatch,
    }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContext 