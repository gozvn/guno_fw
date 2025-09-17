import {Component, Injector, OnInit} from "@angular/core";
import { BaseComponent } from "../../../../core/components/base-component";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "../../../../../services/authentication.service";
import { RoleService } from "../../../services/system.role.service";
import {Location} from "@angular/common";
import { environment } from "../../../../../../environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { AdminDialogSystemCreateRoleComponent } from "./dialogs/create/create.component";
import { RoleModel } from "../../../models/role.model";
import { AdminDialogSystemPermissionRoleComponent } from "./dialogs/permission/permission.component";

@Component({
  selector: "app-admin-system-role",
  templateUrl: "./role.component.html",
  styleUrl: "./role.component.scss",
})
export class AdminSystemRoleComponent extends BaseComponent implements OnInit{
	roles: RoleModel[] = [];
	statuses = [1, 0];
	keyword = '';
	status: any;
	environment = environment;
	filterCount = 0;
	displayedColumns: string[] = ['sequence', 'name', 'status', 'action'];
	listPermissionLocked = [1, 0];
	constructor(public override activeRoute: ActivatedRoute,
			public override translateService: TranslateService,
			public override authenticationService: AuthenticationService,
            public override injector: Injector,
			private roleService: RoleService,
			public dialog: MatDialog,
			private location: Location) {
	super(activeRoute, translateService, authenticationService, injector);
	this.activeRoute.queryParams.subscribe((params: any) => {
		this.currentPage = params['page'] ?? 1;
		this.currentPage = parseInt(this.currentPage.toString());
		this.pageIndex = this.currentPage - 1;
		this.status = params.hasOwnProperty('status') ? parseInt(params['status']) : -1;
		this.keyword = params['keyword'] ?? ''
	});
	}

	override ngOnInit(): void {
		this.search();
	}

	search() {
		this.loadingState = true;

        const queries: any = {
            limit: this.pageSize
        };
        if (this.pageIndex > 0) {
            queries.page = this.pageIndex;
        }
        if (this.keyword !== '') {
            queries.keyword = encodeURIComponent(this.keyword);
        }
        if (typeof this.status !== 'undefined' && this.status !== -1) {
            queries.status = this.status;
        }
        this.roleService.get(queries).subscribe((result) => {
            this.roles = result.data.length > 0 ? result.data : [];
			this.loadingState = false;
            this.filterCount = result.count || 0;
			this.pageLength = result.count;
        });
		const params = [];
        for (const i in queries) {
            params.push(i + '=' + queries[i]);
        }

        this.location.replaceState(
			`/${environment.administratorPrefix}/system/manage-role`,
        	params.join("&")
		);
    }

	openDialogCreateRole() {
        const dialogRef = this.dialog.open(AdminDialogSystemCreateRoleComponent, {
            autoFocus: true,
            width: '400px',
            height: 'auto',
            panelClass: 'admin-dialog-role-create',
            data: {
                statuses: this.statuses,
                listPermissionLocked: this.listPermissionLocked
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search();
            }
        });
    }

	onInputKeyword(event: any) {
		const input = (event.target as HTMLInputElement).value;
        this.keyword = input;
        this.pageIndex = 0;
        this.currentPage = 1;
        this.search();
	}

	onSelectStatusChange(event: any) {
        this.status = event.value;
        this.search();
    }

	onPageChange(event: any) {
        if (this.loadingState || (this.pageSize === event.pageSize && this.pageIndex === event.pageIndex)) return;

        this.pageIndex = event.pageIndex;
        this.currentPage = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.search();
    }

    openDialogPermission(role: RoleModel) {
            const dialogRef = this.dialog.open(AdminDialogSystemPermissionRoleComponent, {
                autoFocus: false,
                panelClass: 'admin-dialog-role-permission',
                width: '1200px',
                height: 'auto',
                maxHeight: '80vh',
                data: {
                    role,
                    statuses: this.statuses
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.search();
                }
            });
    }
}
