// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import {User} from "../../../models/user.model";

// Action khi người dùng login thành công
export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: any; redirect: boolean }>()
);

// Action khi người dùng logout
export const logout = createAction('[Auth] Logout');

// Action khi auto login
export const autoLogin = createAction('[Auth] Auto Login');
