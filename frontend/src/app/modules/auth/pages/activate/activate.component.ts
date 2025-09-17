import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../core/components/base-component";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";
import {AuthSocialService} from "../../services/auth.social.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-auth-page-activate',
    templateUrl: './activate.component.html',
    styleUrl: './activate.component.scss'
})
export class AuthPageActivateComponent extends BaseComponent implements OnInit {

    form: FormGroup;

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private router: Router,
                private appAuthSocialService: AuthSocialService) {
        super(activeRoute, translateService, authenticationService, injector);

        this.form = new FormGroup({
            teacherName: new FormControl('', [Validators.required, Validators.minLength(6)]),
            yourName: new FormControl('', [Validators.required, Validators.minLength(6)]),
            yourChildrenName: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });

        this.user = this.authenticationService.getUserFromLocalStorage();
    }

    override ngOnInit() {
        super.ngOnInit();

        if (this.user && this.user.isLivestream()) {
            this.router.navigate(['/']);
        }
    }

    get f() {
        return this.form.controls;
    }

    submit() {
        console.log(this.form.value);
        const data = this.form.value;
        // this.a1UserService.activate(data).subscribe((result: any) => {
        //     console.log(result)
        //     if (result?.roleId && result?.teacher && result?.parent) {
        //         this.user.roleId = result.roleId;
        //         console.log(this.user)
        //         this.authenticationService.setUserInLocalStorage(this.user);
        //         this.router.navigate(['/', 'announce', 'notifications']);
        //     }
        // });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/', 'auth', 'login']);
    }
}
