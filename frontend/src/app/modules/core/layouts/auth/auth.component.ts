import {Component, Injector, ViewChild} from '@angular/core';
import {CoreService} from "../../../../services/core.service";
import {AppSettings} from "../../../../interfaces/config";
import {ActivatedRoute, RouterModule, RouterOutlet} from "@angular/router";
import {MaterialModule} from "../../../../shared/modules/material.module";
import {CommonModule} from "@angular/common";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatSidenav, MatSidenavContent} from "@angular/material/sidenav";
import {AppHorizontalHeaderComponent} from "../_partials/app-horizontal-header/app-horizontal-header.component";
import {BaseComponent} from "../../components/base-component";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";

interface apps {
    id: number;
    icon: string;
    color: string;
    title: string;
    subtitle: string;
    link: string;
}

@Component({
    selector: 'app-layout-blank',
    standalone: true,
    imports: [
        RouterModule,
        RouterOutlet, MaterialModule, CommonModule, TablerIconsModule,
        AppHorizontalHeaderComponent
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class LayoutAuthComponent extends BaseComponent {

    private htmlElement!: HTMLHtmlElement;

    options: any;

    apps: apps[] = [
        {
            id: 1,
            icon: 'solar:video-library-outline',
            color: 'primary',
            title: 'Livestream',
            subtitle: 'Thông tin livestream hàng ngày',
            link: '/livestream/search',
        },
    ];

    public sidenav: any = null;
    resView = false;
    @ViewChild('content', { static: true }) content!: MatSidenavContent;

    constructor(override activeRoute: ActivatedRoute,
                override translateService: TranslateService,
                override authenticationService: AuthenticationService,
                override injector: Injector,
                private settings: CoreService) {

        super(activeRoute, translateService, authenticationService, injector);

        this.htmlElement = document.querySelector('html')!;
        this.options = this.settings.getOptions();
        // Initialize project theme with options
        this.receiveOptions(this.options);
    }

    receiveOptions(options: AppSettings): void {
        this.options = options;
        this.toggleDarkTheme(options);
    }

    toggleDarkTheme(options: AppSettings) {
        if (options.theme === 'dark') {
            this.htmlElement.classList.add('dark-theme');
            this.htmlElement.classList.remove('light-theme');
        } else {
            this.htmlElement.classList.remove('dark-theme');
            this.htmlElement.classList.add('light-theme');
        }
    }
}
