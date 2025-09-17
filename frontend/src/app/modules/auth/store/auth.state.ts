import { User } from '../../../models/user.model';

export interface AuthState {
    user: User | null;
    isLoggedIn: boolean | false;
}

export const initialState: AuthState = {
    user: null,
    isLoggedIn: false
};
