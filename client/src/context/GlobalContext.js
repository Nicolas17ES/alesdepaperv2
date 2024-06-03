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
    emailState: false,
    birds: null,
    singleBird: null,
    displayCart: false,
    cartItems: [],
    displayBirdsData: false,
    shippingMethod: 0,
        
}
export const GlobalProvider = ({children}) => {
    

    const [state, dispatch] = useReducer(globalReducer, initialState)

    return <GlobalContext.Provider value={{
        birds: state.birds,
        stripePromise: state.publishableKey,
        clientSecret: state.clientSecret,
        emailState: state.emailState,
        birds: state.birds,
        singleBird: state.singleBird,
        displayCart: state.displayCart,
        cartItems: state.cartItems,
        displayBirdsData: state.displayBirdsData,
        shippingMethod: state.shippingMethod,
        dispatch,
    }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContext 