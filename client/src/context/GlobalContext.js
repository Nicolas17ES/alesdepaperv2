/**
 * @file context/GlobalContext.js
 * @description Global context and provider for managing app-wide state.
 */

import {createContext, useReducer} from 'react'
import globalReducer from './GlobalReducer'



const GlobalContext = createContext();

export const initialState = {
    birds: [],
    user: null,
    stripePromise: null,
    clientSecret: null,
    emailState: false,
    birds: null,
    singleBird: null,
    displayCart: false,
    cartItems: [],
    displayBirdsData: false,
    shippingMethod: 0,
    orders: null,
        
}
export const GlobalProvider = ({children}) => {
    

    const [state, dispatch] = useReducer(globalReducer, initialState)

    return <GlobalContext.Provider value={{
        user: state.user,
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
        orders: state.orders,
        dispatch,
    }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContext 