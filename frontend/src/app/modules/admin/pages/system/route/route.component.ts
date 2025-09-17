import {Component, ElementRef, HostListener, Injector, Input, OnInit, ViewChild} from '@angular/core';
import { BaseComponent } from '../../../../core/components/base-component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../../../services/authentication.service';
import { RoleService } from '../../../services/system.role.service';
import { MatDialog } from '@angular/material/dialog';
import {Location} from "@angular/common";
import { RouteService } from '../../../services/system.route.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { DialogConfirmActionComponent } from '../../../../core/components/dialogs/confirm-action/confirm-action.component';
import { RouteModel } from '../../../models/route.model';

@Component({
  selector: 'app-admin-system-route',
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss'
})
export class AdminSystemRouteComponent extends BaseComponent implements OnInit {
	keyword = '';
	routes: RouteModel[] = [];
	filterCount = 0;
    environment = environment;
    @Input() required = false; // Is input required?
    @Input() type = 'text'; // The type of input element
    @ViewChild('inlineEditControlName') inlineEditControlName!: ElementRef; // input DOM element
    editNameId = '';
    preNameValue = '';
    @ViewChild('inlineEditControlRoute') inlineEditControlRoute!: ElementRef; // input DOM element
    editRouteId = '';
    preRouteValue = '';
    @ViewChild('inlineEditControlGroupName') inlineEditControlGroupName!: ElementRef; // input DOM element
    editGroupNameId = '';
    preGroupNameValue = '';
	onDestroyRoute: Subscription | undefined;
	displayedColumns: string[] = ['sequence', 'name', 'groupName', 'route', 'uri', 'method'];
    typeObjects = {
        name: 1,
        groupName: 2,
        route: 3
    }
	constructor(public override activeRoute: ActivatedRoute,
				public override translateService: TranslateService,
				public override authenticationService: AuthenticationService,
                public override injector: Injector,
				private roleService: RoleService,
				public dialog: MatDialog,
				private routeService: RouteService,
				private location: Location) {
		super(activeRoute, translateService, authenticationService, injector);
		this.activeRoute.queryParams.subscribe((params: any) => {
			this.currentPage = params.page ?? 1;
			this.currentPage = parseInt(this.currentPage.toString());
			this.pageIndex = this.currentPage - 1;
			this.keyword = params['keyword'] ?? ''
		});
		}
	override ngOnInit(): void {
		this.search();
	}

	onInputKeyword(event: any) {
		const input = (event.target as HTMLInputElement).value;
        this.keyword = input;
        this.pageIndex = 0;
        this.currentPage = 1;
        this.search();
	}

	search() {
        const queries: any = {};
        if (this.pageIndex > 0) {
            queries.page = this.pageIndex;
        }
        if (this.pageSize > 0) {
            queries.limit = this.pageSize;
        }
        if (this.keyword !== '') {
            queries.keyword = encodeURIComponent(this.keyword);
        }
        this.onDestroyRoute = this.routeService.get(queries).subscribe(result => {
            this.routes = result.data || [];
            this.filterCount = result.count;
			this.pageLength = result.count
        });

        const params = [];
        // tslint:disable-next-line:forin
        for (const i in queries) {
            params.push(i + '=' + queries[i]);
        }

        this.location.replaceState(
			`/${environment.administratorPrefix}/system/manage-route`,
        	params.join("&")
		);
    }

    onPageChange(event: any) {
        if (this.loadingState || (this.pageSize === event.pageSize && this.pageIndex === event.pageIndex)) return;

        this.pageIndex = event.pageIndex;
        this.currentPage = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.search();
    }

    syncRoute() {
        this.routeService.import().subscribe(response => {
            this.search();
        });
    }

    openDialogSyncRoute() {
        const confirmDialogRef = this.dialog.open(DialogConfirmActionComponent, {
            width: '400px',
            disableClose: false,
            data: {
                callback: () => {
                    this.syncRoute();
                }
            }
        });
    }

    //Optimize
    @HostListener('keypress', ['$event'])
    onKeyPressInput(event: any, route: any, type: number) {
        if (event.key === 'Enter' && event.target.value !== '') {
            let typeInput: number = 0 
            switch (type) {
                case this.typeObjects.name:
                    typeInput = this.typeObjects.name
                    break;
                case this.typeObjects.groupName: 
                    typeInput = this.typeObjects.groupName;
                    break;
                case this.typeObjects.route:
                    typeInput = this.typeObjects.route;
                    break;
                default:
                    break;
            }

            this.saveValue(route, typeInput);
        }
    }

    editValue(value: any, route: any, type: number) {
        switch (type) {
            case this.typeObjects.name:
                this.preNameValue = value;
                this.editNameId = route.id;
                // Focus on the input element just as the editing begins
                setTimeout(() => {
                    this.inlineEditControlName.nativeElement.focus()
                });
                break;
            case this.typeObjects.groupName: 
                this.preGroupNameValue = value;
                this.editGroupNameId = route.id;
                // Focus on the input element just as the editing begins
                setTimeout(() => {
                    this.inlineEditControlGroupName.nativeElement.focus()
                });
                break;
            case this.typeObjects.route:
                this.preRouteValue = value;
                this.editRouteId = route.id;
                // Focus on the input element just as the editing begins
                setTimeout(() => {
                    this.inlineEditControlRoute.nativeElement.focus()
                });
                break;
            default:
                break;
        }
    }

    saveValue(route: any, type: number) {
        if (route == null) {
            return
        };

        let routeString = '';
        let nameString = '';
        let groupString = '';
        let data: any = {};

        const routeId = route.id;
        switch (type) {
            case this.typeObjects.name:
                nameString = this.inlineEditControlName.nativeElement.value
                const indexName = this.routes.findIndex((e: any) => e.id === routeId);
                this.editNameId = '';
                this.routes[indexName].name = nameString;

                data = {
                    name: nameString
                }
                break;
            case this.typeObjects.groupName:
                groupString = this.inlineEditControlGroupName.nativeElement.value
                const indexGroupName = this.routes.findIndex((e: any) => e.id === routeId);
                this.editGroupNameId = '';
                this.routes[indexGroupName].groupName = groupString;

                data = {
                    groupName: groupString
                }
                break;
            case this.typeObjects.route:
                routeString = this.inlineEditControlRoute.nativeElement.value
                this.editRouteId = '';

                data = {
                    route: routeString
                }
                break;
            default:
                break;
        }

        this.routeService.update(routeId, data).subscribe((result: any) => {
            const index = this.routes.findIndex((e: any) => e.id === routeId);
            if (typeof index !== 'undefined') {
                switch (type) {
                    case this.typeObjects.name:
                        this.routes[index].name = nameString;
                        break;
                    case this.typeObjects.groupName:
                        this.routes[index].groupName = groupString;
                        break;
                    case this.typeObjects.route:
                        this.routes[index].route = routeString;
                        break;
                    default:
                        break;
                }
            }
        });
    }
}
