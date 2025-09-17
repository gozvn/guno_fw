import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserActiveGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getUserFromLocalStorage();
        const roleValues = Object.values(environment.roles);
        // not logged in so redirect to login page with the return url
        if (!currentUser || !currentUser.roleId || roleValues.indexOf(currentUser.roleId) < 0) {
            this.router.navigate(['auth', 'activate'], {queryParams: {returnUrl: state.url}});
            return false;
        }
        return true;
    }
}
