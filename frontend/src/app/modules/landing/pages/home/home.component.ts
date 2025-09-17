import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../core/components/base-component";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-landing-page-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class LandingPageHomeComponent extends BaseComponent implements OnInit {

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private router: Router) {
        super(activeRoute, translateService, authenticationService, injector);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.activeRoute.data.subscribe((data) => {
            this.setTitle(data['title']);
        });

        const user = this.user;
        switch (user.roleId) {
            case environment.roles.productionDepartment:
                this.router.navigate(['admin', 'stats', 'top-product']);
                break;
        }
    }
}
