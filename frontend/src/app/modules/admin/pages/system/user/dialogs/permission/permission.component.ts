import {AfterViewInit, Component, ElementRef, Inject, Injector, ViewChild} from '@angular/core';
import { BaseComponent } from '../../../../../../core/components/base-component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../../../../../services/authentication.service';
import { UserService } from '../../../../../services/system.user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Location} from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../../../models/user.model';
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { PermissionService } from '../../../../../services/system.permission.service';
import { AclModel } from '../../../../../models/acl.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { environment } from '../../../../../../../../environments/environment';
import { RoleModel } from '../../../../../models/role.model';
import { htmlTagValidator, whiteSpaceValidator } from '../../../../../../../validations/custom.validation';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-dialog-permission-user',
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export class AdminDialogSystemPermissionUserComponent extends BaseComponent implements AfterViewInit {
	formUser: FormGroup;
	roles: RoleModel[] = [];
	statuses: number[] = [];
	packages: any[] = [];
	objectType = 'user';
	environment = environment;
    title = 'User Permission';
    userInfo: UserModel = new UserModel();
    acl: AclModel[] = [];
    aclAll: AclModel[] = [];
    aclAllow: AclModel[] = [];
    aclDeny: AclModel[] = [];
    domains: [] = [];
	addOnBlur = false;
	tabCurrent = 'permission-tab-user-info';
	displayedColumns: string[] = ['sequence', 'allowed', 'name', 'groupName', 'package', 'uri'];
	separatorKeysCodes: number[] = [ENTER, COMMA];
	package = '';
	@ViewChild('keyword') keyword: ElementRef | undefined;

	constructor(
		@Inject(MAT_DIALOG_DATA)
    	public data: {statuses: [], roles: [], user: UserModel},
		public override activeRoute: ActivatedRoute,
		private dialogRef: MatDialogRef<AdminDialogSystemPermissionUserComponent>,
		public override translateService: TranslateService,
		public override authenticationService: AuthenticationService,
		public override injector: Injector,
		private userService: UserService,
		public dialog: MatDialog,
		private fb: FormBuilder,
		private permissionService: PermissionService,
		private snackBar: MatSnackBar,
		private location: Location) 
		{
			super(activeRoute, translateService, authenticationService, injector);
			dialogRef.disableClose = true;
			this.roles = data.roles;
			this.userInfo = JSON.parse(JSON.stringify(data.user));
			this.statuses = data.statuses;
			this.dialogRef.keydownEvents().subscribe(event => {
				if (event.key === "Escape") {
					this.dialogRef.close();
				}
			});
		}

	override ngOnInit(): void {
		this.initForm();
	}

	override ngAfterViewInit(): void {
		setTimeout(() => {
			this.getData();
		}, 0);
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			horizontalPosition: 'end',
			verticalPosition: 'top',
			duration: 10 * 1000,
		});
	}

	initForm() {
		this.formUser = this.fb.group({
            id: [this.userInfo?.id],
            email: [{value: this.userInfo?.email,  disabled: true}],
            roleId: [this.userInfo?.roleId],
            status: [this.userInfo?.status],
            fullName: [this.userInfo?.fullName ?? this.userInfo.email, [Validators.required, Validators.minLength(5), Validators.maxLength(255), htmlTagValidator, whiteSpaceValidator(5)]]
        });
	}

	save() {
		if (this.checkFormValid()) {
            const encryptBody = this.environment.rsa.isActive || false;
            if (this.formUser.value.password) {
                if (this.formUser.invalid) {
                    return;
                }
            }
            const password = this.formUser.value.password;
            const confirmPassword = this.formUser.value.confirmPassword;
            let body = this.formUser.value;
            
            this.loadingState = true;
            this.userService.update(body, '', password, confirmPassword, encryptBody).subscribe(result => {
                this.loadingState = false;
                if (result.status === 1) {
                    this.getData();
                    this.dialogRef.close(true);
                    this.openSnackBar(this.translateService.instant('admin.system.user.notify.updateSuccess'), '')
                    return;
                }
                this.openSnackBar(this.translateService.instant('admin.system.user.notify.updateFailed'), '')
            });
        }
	}

	private getData() {
        this.permissionService.details(this.objectType, this.userInfo.id).subscribe(result => {
            this.acl = result.data.routes.all.length > 0 ? result.data.routes.all : [];
            this.aclAll = this.acl;
            this.aclAllow = result.data.routes.allow.length > 0 ? result.data.routes.allow : [];
            this.aclDeny = result.data.routes.deny.length > 0 ? result.data.routes.deny : [];
            this.pageLength = result.count;
            this.domains = result.data.domains;
            this.packages = result.data.packages;
        });
    }

	checkFormValid() {
        return this.formUser.valid;
    }

	public filterRoutes($event: any) {
        this.aclAll = this.acl.filter(e => {
            // @ts-ignore
            const keyword = this.keyword.nativeElement.value.trim();
            const keywordResult = keyword === '' ? true
                : (keyword && (e.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
                    || e.uri.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) ? true : (keyword === ''));
            const packageResult = this.package === '' ? true
                : (this.package && this.package === (e.vendor + ' / ' + e.package) ? true : false);
            return keywordResult && packageResult;
        });
    }

	public toggle(event: MatSlideToggleChange, acl: AclModel) {
        this.loadingState = true;
        this.permissionService.set(this.objectType, this.userInfo.id, acl, event.checked).subscribe(result => {
            this.loadingState = false;
            if (result.status === 1) {
                acl.isAllow = result?.data?.allow;
                if (acl.isAllow) {
                    this.aclAllow.push(acl);
					this.aclAllow = [...this.aclAllow];
                    const index = this.aclDeny.indexOf(acl);
                    this.aclDeny.splice(index, 1);
					this.aclDeny = [...this.aclDeny];
                } else {
                    this.aclDeny.push(acl);
					this.aclDeny = [...this.aclDeny];
                    const index = this.aclAllow.indexOf(acl);
                    this.aclAllow.splice(index, 1);
					this.aclAllow = [...this.aclAllow];
                }
                this.openSnackBar(this.translateService.instant('admin.system.user.notify.updateSuccess'), '')
                return;
            }
			this.openSnackBar(this.translateService.instant('admin.system.user.notify.updateFailed'), '')
        });
    }

	changeTab(event: MatTabChangeEvent) {
		switch (event.index) {
			case 0:
				this.tabCurrent = 'permission-tab-user-info';
				break;
			case 1:
				this.tabCurrent = 'permission-tab-all-routes';
				break;
			case 2:
				this.tabCurrent = 'permission-tab-allowed-routes';
				break;
			case 3:
				this.tabCurrent = 'permission-tab-denied-routes';
				break;
			default:
				break;
		}
	}
}
