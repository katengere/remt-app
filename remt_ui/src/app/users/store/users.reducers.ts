import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { UserTypeInterface, UserTypeStateInterface } from "../types/userTypes";
import * as usersActions from "./users.actions";


export const usersAdapter: EntityAdapter<UserTypeInterface> = createEntityAdapter<UserTypeInterface>();

const initialState: UserTypeStateInterface = usersAdapter.getInitialState({
  isLoading: false, error:null
});

export const usersReducer = createReducer(
  initialState,
  // on(usersActions.getUser, (state, actions)=>({...state, isLoading:true})),
  // on(usersActions.getAdminSuccess, (state, {userAdmin})=>{
  //   return usersAdapter.addMany(userAdmin, {...state, isLoading:false});
  // }),
  // on(usersActions.getAdminFailure, (state, {error})=>({
  //   ...state, isLoading:false, error:error
  // })),
  on(usersActions.login, (state,actions)=>({...state, isLoading:true})),
  on(usersActions.loginSuccess, (state, {person})=>
  usersAdapter.addOne(person, {...state, isLoading:false})),
  on(usersActions.loginFailure, (state, {error})=>({
    ...state, isLoading:false, error:error
  })),
  on(usersActions.register, (state,actions)=>({...state, isLoading:true})),
  on(usersActions.registerSuccess, (state, {person})=>
  usersAdapter.addOne(person, {...state, isLoading:false})),
  on(usersActions.registerFailure, (state, {error})=>({
    ...state, isLoading:false, error:error
  })),
  on(usersActions.authFailure, (state, {error})=>({
    ...state, isLoading:false, error:error
  }))
);

export const {selectAll,selectEntities,selectIds,selectTotal} = usersAdapter.getSelectors();
