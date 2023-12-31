import { createAction, props } from "@ngrx/store";
import { PersonInfoInterface, UserTypeInterface } from "../types/userTypes";
import { Message } from "../types/message";

export const getUser = createAction('[Admin Page] get admin');
export const getAdminSuccess = createAction('[Admin Page] get admin success', props<{userAdmin:UserTypeInterface[]}>());
export const getAdminFailure = createAction('[Admin Page] get admin failure', props<{error: Message}>());

export const login = createAction('[Login Page] login', props<PersonInfoInterface>());
export const loginSuccess = createAction('[Login Page] login success', props<{person:UserTypeInterface}>());
export const loginFailure = createAction('[Login Page] login failure', props<{error:Message}>());

export const search = createAction('[Search Field] search', props<{search:string}>());
export const searchSuccess = createAction('[Search Field] search success', props<{result:any}>());
export const searchFailure = createAction('[Search Field] search failure', props<{error:Message}>());

export const logout = createAction('[Logout Button] logout');
export const logoutSuccess = createAction('[Logout Button] logout success', props<{msg:string}>());

export const authFailure = createAction('[Auth Snackbar] authentication failure', props<{error:Message}>());

export const register = createAction('[Register Page] register', props<PersonInfoInterface>());
export const registerSuccess = createAction('[Register Page] register success', props<{person:UserTypeInterface}>());
export const registerFailure = createAction('[Register Page] register failure', props<{error:Message}>());
