export type initialStateType = {
    loading: boolean;
    error: boolean;
    errorLoginMessage: string;
    successLoginMessage: string;
    token: string;
    refreshToken: string;
    logOut?:boolean;
}

export type initialRegisterStateType = {
    loading: boolean;
    error: boolean;
    errorRegisterMessage: string;
    successRegisterMessage: string;
}

export type stateActionType = {
    payload?: any;
    type: string;
}

export interface loginType {
   email: string;
   password: string;
}
type LinkTypes = {
    path: string;
    pathname: string;
}

export type LinkArray = LinkTypes[];
