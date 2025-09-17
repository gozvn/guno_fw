import {Component, Injector} from "@angular/core";
import { BaseComponent } from "../../../../core/components/base-component";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "../../../../../services/authentication.service";
import {Location} from "@angular/common";
import { Subscription } from "rxjs";
import { UserService } from "../../../services/system.user.service";
import { RoleService } from "../../../services/system.role.service";
import { MatDialog } from "@angular/material/dialog";
import { AdminDialogSystemCreateUserComponent } from "./dialogs/create/create.component";
import { UserModel } from "../../../models/user.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../../../../../../environments/environment";
import { AdminDialogSystemPermissionUserComponent } from "./dialogs/permission/permission.component";

@Component({
  selector: "app-admin-system-user",
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.scss",
})

export class AdminSystemUserComponent extends BaseComponent {
	filterCount = 0;
	filter = {
		status: -2,
		role: -1,
		keyword: ''
	};
	statuses = [-1, 0, 1];
	roles: any[] =[];
	users: UserModel[] = [];
	private sidenavSubscription: any = null;
	displayedColumns: string[] = ['sequence', 'name', 'email', 'status', 'role', 'action'];
	subscribeUser!: Subscription;
	avatarDefault = './assets/images/profiles/user-1.jpg';
	environment = environment;
	constructor(public override activeRoute: ActivatedRoute,
		public override translateService: TranslateService,
		public override authenticationService: AuthenticationService,
		public override injector: Injector,
		private userService: UserService,
		private roleService: RoleService,
		public dialog: MatDialog,
		private snackBar: MatSnackBar,
		private location: Location) {
	super(activeRoute, translateService, authenticationService, injector);
	this.activeRoute.queryParams.subscribe((params: any) => {
		this.currentPage = params.page ?? 1;
		this.currentPage = parseInt(this.currentPage.toString());
		this.pageIndex = this.currentPage - 1;
		this.filter.role = params['role'] ? parseInt(params['role']) : -1;
		this.filter.status = params.hasOwnProperty('status') ? parseInt(params['status']) : -2;
		this.filter.keyword = params['keyword'] ?? ''
	});
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.search();
		this._getRoles({});
	}

	override ngOnDestroy() {
        super.ngOnDestroy();
    }

	search(loadingState = true) {
        const queries: any = {
            limit: this.pageSize,
			loadingState: loadingState,
			page: this.currentPage,
        };
        if (this.filter.status !== -2) {
            queries.status = this.filter.status;
        }
		if (this.filter.role && this.filter.role !== -1) {
            queries.role = this.filter.role;
        }
        if (this.filter.keyword !== '') {
            queries.keyword = encodeURIComponent(this.filter.keyword);
        }
        this.subscribeUser = this.userService.get(queries).subscribe((result) => {
            this.loadingState = false;
            this.users = result.data.length > 0 ? result.data : [];
            this.filterCount = result.count;
			this.pageLength = result.count;
        });

        const params = [];
        // tslint:disable-next-line:forin
        for (const i in queries) {
            params.push(i + '=' + queries[i]);
        }
        this.location.replaceState(
            `/${environment.administratorPrefix}/system/manage-user`,
        	params.join("&")
        );
	}

	private _getRoles(queries: any) {
        this.roleService.get(queries).subscribe((result) => {
            this.roles = result.data.length > 0 ? result.data : [];
        });
    }

	onInputKeyword(event: any) {
		const input = (event.target as HTMLInputElement).value;
        this.filter.keyword = input;
        this.pageIndex = 0;
        this.currentPage = 1;
        this.search();
	}

	onSelectStatusChange(event: any) {
        this.filter.status = event.value;
        this.search();
    }

	onSelectRoleChange(event: any) {
        this.filter.role = event.value;
        this.search();
    }

	onPageChange(event: any) {
        if (this.loadingState || (this.pageSize === event.pageSize && this.pageIndex === event.pageIndex)) return;

        this.pageIndex = event.pageIndex;
        this.currentPage = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.search();
    }

	openDialogCreateUser() {
		const dialogRef = this.dialog.open(AdminDialogSystemCreateUserComponent, {
			width: '800px',
			panelClass: 'admin-dialog-system-create-user',
			data: {
				roles: this.roles,
				statuses: this.statuses
			}
		})

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.search();
			}
        });
	}

	openDialogPermission(user: UserModel) {
		if (user.roleId == 1) {
            return;
        }
		const dialogRef = this.dialog.open(AdminDialogSystemPermissionUserComponent, {
            autoFocus: false,
            panelClass: 'admin-dialog-user-permission',
            width: '1200px',
            height: 'auto',
            maxHeight: '80vh',
            data: {
                user,
                roles: this.roles,
                statuses: this.statuses
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.search();
            }
        });
	}

	setRole(event: any, user: UserModel) {
		const newRoleId = event.value;
		this.loadingState = true;
		const encryptBody = this.environment.rsa.isActive || false;
        this.userService.setRole(user.id, newRoleId, encryptBody).subscribe((result) => {
            this.loadingState = false;
            if (result.status === 1) {
                this.users
                    .filter((v) => v.id === user.id)
                    .forEach((v) => {
                        v.roleId = Number(newRoleId);
                    });
				this.openSnackBar(this.translateService.instant('admin.system.user.notify.updateSuccess'), '')
                return;
            }
            this.openSnackBar(this.translateService.instant('admin.system.user.notify.updateFailed'), '')
        });
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			horizontalPosition: 'end',
			verticalPosition: 'top',
			duration: 10 * 1000,
		});
	}
}
