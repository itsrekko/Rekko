import React, {useReducer} from "react";

// Use useEffect here to setItem to localStorage
// Update initialGlobalState to defaultGlobalState || localStorage

export const defaultGlobalState = {
    userName: '',
    userId: '',
    existingUser: false,
    reviews: []
}
const globalStateContext = React.createContext(defaultGlobalState);
const dispatchStateContext = React.createContext(undefined);

const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
      (state, newValue) => ({ ...state, ...newValue }),
      defaultGlobalState
    );
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

export default GlobalStateProvider;
