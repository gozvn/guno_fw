import { SharedState } from './shared/shared.state';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import {AuthState} from "../modules/auth/store/auth.state";
import {AUTH_STATE_NAME} from "../modules/auth/store/auth.selector";
import {RouterReducerState} from "@ngrx/router-store";

export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    [AUTH_STATE_NAME]: AuthState;
    router: RouterReducerState;
}
