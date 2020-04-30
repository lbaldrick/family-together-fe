import * as React from 'react'
import {FamiliesAction, FamiliesActionsEnum} from "./FamiliesActions";
import {AsyncDataStateEnum} from "../../UiStates";
import superagent from "superagent";
import {Family} from "../../model/Family";

type Dispatch = (action: FamiliesAction) => void

export interface State {
    currentFamilyActionState?: AsyncDataStateEnum;
    currentFamily?: Partial<Family>;
}

type FamiliesProviderProps = {children: React.ReactNode}

const FamiliesStateContext = React.createContext<State>({});

const FamiliesDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const familiesReducer = (state: State, action: FamiliesAction): State => {
    switch (action.type) {
        case AsyncDataStateEnum.IN_PROGRESS: {
            return {currentFamilyActionState: AsyncDataStateEnum.IN_PROGRESS}
        }
        case AsyncDataStateEnum.COMPLETED_SUCCESS: {
            return {
                currentFamilyActionState:  AsyncDataStateEnum.COMPLETED_SUCCESS,
                currentFamily: action.payload,
            }
        }
        case AsyncDataStateEnum.COMPLETED_FAIL: {
            return {currentFamilyActionState: AsyncDataStateEnum.COMPLETED_FAIL}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
};

const useFamiliesState = (): State => {
    const context = React.useContext(FamiliesStateContext);
    if (context === undefined) {
        throw new Error('useCountState must be used within a CountProvider')
    }
    return context;
};

const useFamiliesDispatch = (): Dispatch => {
    const context = React.useContext(FamiliesDispatchContext);
    if (context === undefined) {
        throw new Error('useCountDispatch must be used within a CountProvider')
    }
    return context;
};

const fetchFamily = async (dispatch: Dispatch): Promise<void>  => {
    dispatch({type: AsyncDataStateEnum.STARTED});
    try {
        const response = await superagent.get('/mocks/family.json');
        const {id} = response.body;
        dispatch({type: AsyncDataStateEnum.COMPLETED_SUCCESS, payload: {
                id,
            }})
    } catch (error) {
        dispatch({type: AsyncDataStateEnum.COMPLETED_FAIL})
    }
};

//TODO save to database and make this async
const saveFamily = (dispatch: Dispatch, payload: any): void => {
    dispatch({type: AsyncDataStateEnum.STARTED});
    try {
        dispatch({type: AsyncDataStateEnum.COMPLETED_SUCCESS, payload})
    } catch (error) {
        dispatch({type: AsyncDataStateEnum.COMPLETED_FAIL})
    }
};

const FamiliesProvider = ({children}: FamiliesProviderProps): React.ReactElement => {
    const [state, dispatch] = React.useReducer(familiesReducer, {});

    return (
        <FamiliesStateContext.Provider value={state}>
            <FamiliesDispatchContext.Provider value={dispatch}>
                {children}
            </FamiliesDispatchContext.Provider>
        </FamiliesStateContext.Provider>

    )
};

export {FamiliesProvider, useFamiliesState, useFamiliesDispatch, fetchFamily, saveFamily}
