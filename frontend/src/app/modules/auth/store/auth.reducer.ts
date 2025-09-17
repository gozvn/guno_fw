// auth.reducer.ts
import {createReducer, on} from '@ngrx/store';
import {logout} from './auth.actions';
import {initialState} from './auth.state';

export const authReducer = createReducer(
    initialState,
    // Xử lý khi auto login (ví dụ từ localStorage)
    on(logout, () => initialState)
);
