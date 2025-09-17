import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CoreService} from "../../../../../services/core.service";
import {AppSettings} from "../../../../../interfaces/config";

@Component({
    selector: 'app-branding',
    standalone: true,
    imports: [RouterModule],
    template: `
        <div class="branding">
            <a [routerLink]="['/']">
                <img src="./assets/styles/default/images/logo.png" height="40" class="align-middle m-2" alt="logo" />
            </a>
        </div>
    `,
})
export class AppBrandingComponent {

    public options: AppSettings;

    constructor(private settings: CoreService) {
        this.options = this.settings.getOptions();
    }
}
