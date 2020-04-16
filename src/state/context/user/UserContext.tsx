import * as React from 'react'
import {UserAction, UserActionsEnum} from "./UserActions";
import {User} from "../../model/User";
import {useEffect} from "react";
import {AsyncDataStateEnum} from "../../model/UiStates";
import superagent from "superagent";

type Dispatch = (action: UserAction) => void

export interface State {
    currentUserAction?: UserActionsEnum;
    currentUserActionState?: AsyncDataStateEnum;
    userData?: Partial<User>;
}

type UserProviderProps = {children: React.ReactNode}

const UserStateContext = React.createContext<State>({});

const UserDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const userReducer = (state: State, action: UserAction): State => {
    switch (action.type) {
        case UserActionsEnum.FETCH_USER_DATA: {
            return { currentUserAction: UserActionsEnum.FETCH_USER_DATA, currentUserActionState: AsyncDataStateEnum.STARTED, userData: {firstName: action.payload?.firstName}}
        }
        case UserActionsEnum.UPDATE_USER_DATA: {
            return { userData: {firstName: action.payload?.firstName}}
        }
        case AsyncDataStateEnum.IN_PROGRESS: {
            return {currentUserActionState: AsyncDataStateEnum.IN_PROGRESS}
        }
        case AsyncDataStateEnum.COMPLETED_SUCCESS: {
            return {
                currentUserActionState:  AsyncDataStateEnum.COMPLETED_SUCCESS,
                userData: action.payload,
            }
        }
        case AsyncDataStateEnum.COMPLETED_FAIL: {
            return {currentUserActionState: AsyncDataStateEnum.COMPLETED_FAIL}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
};

const userProvider = ({children}: UserProviderProps): React.ReactNode => {
        const [state, dispatch] = React.useReducer(userReducer, {});

        useEffect(() => {
            // (async function asyncCall(): Promise<null> {
            //     return await fetchUser();
            // })();
        }, []);

        return (
            <UserStateContext.Provider value={state}>
                <UserDispatchContext.Provider value={dispatch}>
                    {children}
                </UserDispatchContext.Provider>
            </UserStateContext.Provider>

        )
};



const useUserState = (): State => {
    const context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error('useCountState must be used within a CountProvider')
    }
    return context;
};

const useUserDispatch = (): Dispatch => {
    const context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error('useCountDispatch must be used within a CountProvider')
    }
    return context;
};

const fetchUser = async (dispatch: Dispatch, userId: string): Promise<null>  => {
    dispatch({type: AsyncDataStateEnum.STARTED});
    try {
        const updatedUser = await superagent.get('').query({ userId });
        dispatch({type: AsyncDataStateEnum.COMPLETED_SUCCESS, payload: undefined})
    } catch (error) {
        dispatch({type: AsyncDataStateEnum.COMPLETED_FAIL})
    }
    return Promise.resolve(null);
};

export {userProvider, useUserState, useUserDispatch}