
import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
    posts: [],
    error: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);//initial default state is passed to the Reducer fct
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
/**
the context is created using React’s createContext() hook. 
Passing a default state here isn't necessary since it was set by the provider on line 13, 
but we do it anyway for better code auto-completion in the IDE.
*/
export default Store;

