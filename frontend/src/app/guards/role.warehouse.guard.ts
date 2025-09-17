import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class RoleWarehouseGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getUserFromLocalStorage();
        const roles = [environment.roles.superAdmin, environment.roles.admin, environment.roles.warehouseManager, , environment.roles.warehouseStaff];
        if (currentUser && roles.indexOf(currentUser.roleId) >= 0) {
            return true;
        }

        this.router.navigate(['/', 'error', '403-access-denied']);
        return false;
    }
}
