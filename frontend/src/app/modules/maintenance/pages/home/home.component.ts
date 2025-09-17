import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-maintenance-page-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class MaintenanceHomeComponent implements OnInit {

    constructor(private titleService: Title,
                private route: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService) {

    }

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.titleService.setTitle(this.translateService.instant(data['title']));
        });

        if (!environment.maintenanceMode) {
            this.router.navigate(['/']);
        }
    }
}
