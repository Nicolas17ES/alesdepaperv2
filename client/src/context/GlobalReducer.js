

/**
 * @file context/globalReducer.js
 * @description Reducer function for managing global state.
 */

/**
 * Reducer function for handling actions and updating global state.
 * @param {Object} state - The current global state.
 * @param {Object} action - An action object with a type and payload.
 * @returns {Object} - The new global state.
 */
import { initialState } from "./GlobalContext"

const globalReducer = (state, action) => {
    switch(action.type){
        case 'SET_BIRDS':
            return {
                ...state,
                birds: action.payload,
            }
        case 'SET_PUBLISHABLE_KEY':
            return {
                ...state,
                publishableKey: action.payload,
            }
        case 'SET_CLIENT_SECRET':
            return {
                ...state,
                clientSecret: action.payload,
            }
        case 'SET_EMAIL_STATE':
            return {
                ...state,
                emailState: action.payload,
            }
        case 'SET_BIRDS':
            return {
                ...state,
                birds: action.payload,
            }
        case 'SET_SINGLE_BIRD':
            return {
                ...state,
                singleBird: action.payload,
            }
            case 'RESET_STATE':
                return {
                  ...initialState,
                };

        default: 
            return state;
    }
}

export default globalReducer