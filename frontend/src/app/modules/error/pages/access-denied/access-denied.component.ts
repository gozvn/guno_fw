import {Component, Injector} from '@angular/core';
import {BaseComponent} from "../../../core/components/base-component";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
    selector: 'app-error-access-denied',
    templateUrl: './access-denied.component.html',
    styleUrl: './access-denied.component.scss'
})
export class ErrorAccessDeniedComponent extends BaseComponent {

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector) {
        super(activeRoute, translateService, authenticationService, injector);
    }
}
