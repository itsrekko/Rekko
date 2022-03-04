import {useReducer, useContext, createContext, useEffect} from "react";

// Use useEffect here to setItem to localStorage
// Update initialGlobalState to defaultGlobalState || localStorage

export const defaultGlobalState = {
    userName: '',
    userId: '',
    reviews: []
}
const globalStateContext = createContext(defaultGlobalState);
const dispatchStateContext = createContext(undefined);

const GlobalStateProvider = ({ children }) => {

  const jsonElem = localStorage.getItem("GlobalState");
  console.log(typeof jsonElem);

    const [state, dispatch] = useReducer(
      (state, newValue) => ({ ...state, ...newValue }),
      defaultGlobalState
    );

    console.log('GlobalStateProvider called: ', state);

    useEffect(() => {
      localStorage.setItem("GlobalState", state, [state]);
    });

    return (
      <globalStateContext.Provider value={state}>
        <dispatchStateContext.Provider value={dispatch}>
          {children}
        </dispatchStateContext.Provider>
      </globalStateContext.Provider>
    );
  };

export const useGlobalState = () => [
  useContext(globalStateContext),
  useContext(dispatchStateContext)
];

export default GlobalStateProvider;
