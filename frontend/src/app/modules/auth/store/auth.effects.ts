import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private router: Router
    ) {
        console.log('Actions$: ', this.actions$);
    }

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout), // Lắng nghe action logout
        tap(() => {
            //localStorage.removeItem('token'); // Xóa token
            this.router.navigate(['/login']); // Điều hướng đến login
        })
    ));
}
