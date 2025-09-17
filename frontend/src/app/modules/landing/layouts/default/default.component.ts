import {Component, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MaterialModule} from "../../../../shared/modules/material.module";
import {CommonModule} from "@angular/common";
import {LandingPageLayoutPartialHeaderComponent} from "../_partials/header/header.component";
import {LandingPageLayoutPartialFooterComponent} from "../_partials/footer/footer.component";
import {MatSidenavContent} from "@angular/material/sidenav";
import {CoreService} from "../../../../services/core.service";

@Component({
    selector: 'app-landing-page-layout-default',
    standalone: true,
    imports: [
        RouterOutlet, MaterialModule, CommonModule,
        LandingPageLayoutPartialHeaderComponent, LandingPageLayoutPartialFooterComponent
    ],
    templateUrl: './default.component.html',
    styleUrl: './default.component.scss'
})
export class LandingPageLayoutDefaultComponent {

    private htmlElement!: HTMLHtmlElement;
    resView = false;
    options: any;

    @ViewChild('content', { static: true }) content!: MatSidenavContent;

    constructor(private settings: CoreService) {
        this.htmlElement = document.querySelector('html')!;
        this.options = this.settings.getOptions();
        // Initialize project theme with options
    }
}
