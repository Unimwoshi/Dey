import {createContext, useContext, useReducer, ReactNode, Dispatch} from 'react'

export interface OnboardingState {
    name:string;
    email:string;
    location:string;
}

const initialState: OnboardingState = {
    name: '',
    email:'',
    location:'',

}

type OnboardingAction =
 | {type: "UPDATE_FIELD"; field: keyof OnboardingState; value:string}
 | {type: "RESET"};

 function reducer(state:OnboardingState, action:OnboardingAction): OnboardingState {
    switch (action.type) {
        case "UPDATE_FIELD":
            return {...state, [action.field]: action.value};
        case "RESET":
            return initialState;
        default:
            return state;
    }
 }

interface OnboardingContextValue {
    state:OnboardingState;
    updateField: (field: keyof OnboardingState, value: string) => void;
    dispatch: Dispatch<OnboardingAction>
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export function OnboardingProvider({children}: {children: ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    function updateField(field: keyof OnboardingState, value:string) {
        dispatch({type: "UPDATE_FIELD", field, value})
    }

    return(
        <OnboardingContext.Provider value={{state, updateField, dispatch}}>
            {children}
        </OnbardingContext.Provider>
    )
}

export function useOnboarding(): OnboardingContextValue {
    const ctx = useContext(OnboardingContext)
    if(!ctx){
        throw new Error("useOnboarding must be used inside OnboardingProvider")
    }
    return ctx
}