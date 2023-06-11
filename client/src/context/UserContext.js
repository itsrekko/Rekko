import React, {useEffect, useReducer} from "react";

export const defaultGlobalState = {
    userName: '',
    userId: '',
    existingUser: false,
}
const globalStateContext = React.createContext(defaultGlobalState);
const dispatchStateContext = React.createContext(undefined);

const UserContextProvider = ({ children }) => {
    // TODO: check for previous state and if there is not any then we will 
    // store default Global state
    const [state, dispatch] = useReducer(
      (state, newValue) => ({ ...state, ...newValue }),
      defaultGlobalState
    );

    // check in localStorage
    useEffect(() => {
      // run on compoinent mount
      const localState = localStorage.getItem('store');
      if (localState) {
        dispatch(JSON.parse(localState));
      }
    }, []);

    // save on each dispatch
    useEffect(() => {
      localStorage.setItem('store', JSON.stringify(state));
    }, [state])

    return (
      <globalStateContext.Provider value={state}>
        <dispatchStateContext.Provider value={dispatch}>
          {children}
        </dispatchStateContext.Provider>
      </globalStateContext.Provider>
    );
  };

export const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext)
];

export default UserContextProvider;
