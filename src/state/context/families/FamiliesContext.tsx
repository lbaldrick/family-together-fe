import * as React from 'react'
import {FamiliesAction, FamiliesActionsEnum} from "./FamiliesActions";
import {useEffect} from "react";
import {AsyncDataStateEnum} from "../../UiStates";
import superagent from "superagent";
import {Family} from "../../model/Family";

type Dispatch = (action: FamiliesAction) => void

export interface State {
    currentFamiliesAction?: FamiliesActionsEnum;
    currentFamilyActionState?: AsyncDataStateEnum;
    families?: Family[];
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

const fetchFamily = async (dispatch: Dispatch, userId: string): Promise<void>  => {
    dispatch({type: AsyncDataStateEnum.STARTED});
    try {
        const response = await superagent.get('/mocks/user.json').query({ userId });
        const {id} = response.body;
        dispatch({type: AsyncDataStateEnum.COMPLETED_SUCCESS, payload: {
                id,
            }})
    } catch (error) {
        dispatch({type: AsyncDataStateEnum.COMPLETED_FAIL})
    }
};

const fetchFamilies = async (dispatch: Dispatch, userId: string): Promise<void>  => {
    dispatch({type: AsyncDataStateEnum.STARTED});
    try {
        const response = await superagent.get('/mocks/user.json').query({ userId });
        const {id} = response.body;
        dispatch({type: AsyncDataStateEnum.COMPLETED_SUCCESS, payload: {
                id,
            }})
    } catch (error) {
        dispatch({type: AsyncDataStateEnum.COMPLETED_FAIL})
    }
};

const familiesProvider = ({children}: FamiliesProviderProps): React.ReactNode => {
    const [state, dispatch] = React.useReducer(familiesReducer, {});

    useEffect(() => {
        // (async function asyncCall(): Promise<null> {
        //     return await fetchUser();
        // })();
    }, []);

    return (
        <FamiliesStateContext.Provider value={state}>
            <FamiliesDispatchContext.Provider value={dispatch}>
                {children}
            </FamiliesDispatchContext.Provider>
        </FamiliesStateContext.Provider>

    )
};

export {familiesProvider, useFamiliesState, useFamiliesDispatch, fetchFamily, fetchFamilies}
