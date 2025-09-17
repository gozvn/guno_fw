import {Component, Injector} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";
import {BaseComponent} from "../../../core/components/base-component";

@Component({
    selector: 'app-error-not-found',
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class ErrorNotFoundComponent extends BaseComponent {

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector) {
        super(activeRoute, translateService, authenticationService, injector);
    }
}
