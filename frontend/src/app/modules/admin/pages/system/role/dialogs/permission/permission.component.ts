import {AfterViewInit, Component, ElementRef, Inject, Injector, ViewChild} from '@angular/core';
import { BaseComponent } from '../../../../../../core/components/base-component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../../../../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Location} from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { PermissionService } from '../../../../../services/system.permission.service';
import { AclModel } from '../../../../../models/acl.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { environment } from '../../../../../../../../environments/environment';
import { RoleModel } from '../../../../../models/role.model';
import { htmlTagValidator, whiteSpaceValidator } from '../../../../../../../validations/custom.validation';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { RoleService } from '../../../../../services/system.role.service';

@Component({
  selector: 'app-dialog-permission-role',
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export class AdminDialogSystemPermissionRoleComponent extends BaseComponent implements AfterViewInit {
	formRole: FormGroup;
	statuses: number[] = [];
	packages: any[] = [];
	objectType = 'role';
	environment = environment;
    title = 'Role Permission';
    roleInfo: RoleModel = new RoleModel();
    acl: AclModel[] = [];
    aclAll: AclModel[] = [];
    aclAllow: AclModel[] = [];
    aclDeny: AclModel[] = [];
    domains: [] = [];
	addOnBlur = false;
	tabCurrent = 'permission-tab-role-info';
	displayedColumns: string[] = ['sequence', 'allowed', 'name', 'groupName', 'package', 'uri'];
	separatorKeysCodes: number[] = [ENTER, COMMA];
	package = '';
    listPermissionLocked = [1, 0];
	@ViewChild('keyword') keyword: ElementRef | undefined;

	constructor(
		@Inject(MAT_DIALOG_DATA)
    	public data: {statuses: [], role: RoleModel},
		public override activeRoute: ActivatedRoute,
		private dialogRef: MatDialogRef<AdminDialogSystemPermissionRoleComponent>,
		public override translateService: TranslateService,
		public override authenticationService: AuthenticationService,
		public override injector: Injector,
		private roleService: RoleService,
		public dialog: MatDialog,
		private fb: FormBuilder,
		private permissionService: PermissionService,
		private snackBar: MatSnackBar,
		private location: Location) 
		{
			super(activeRoute, translateService, authenticationService, injector);
			dialogRef.disableClose = true;
			this.roleInfo = JSON.parse(JSON.stringify(data.role));
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
		this.formRole = this.fb.group({
            id: [this.roleInfo.id],
            name: [this.roleInfo.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255), htmlTagValidator, whiteSpaceValidator(3)]],
            status: [this.roleInfo.status, [Validators.required]],
            permissionLocked: [this.roleInfo.permissionLocked, [Validators.required]]
        });
	}

	save() {
		if (this.checkFormValid()) {
            let body = this.formRole.value;
            
            this.loadingState = true;
            this.roleService.update(new RoleModel(body)).subscribe(result => {
                this.loadingState = false;
                if (result.status === 1) {
                    this.getData();
                    this.dialogRef.close(true);
                    this.openSnackBar(this.translateService.instant('admin.system.role.notify.updateSuccess'), '')
                    return;
                }
                this.openSnackBar(this.translateService.instant('admin.system.role.notify.updateFailed'), '')
            });
        }
	}

	private getData() {
        this.permissionService.details(this.objectType, this.roleInfo.id).subscribe(result => {
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
        return this.formRole.valid;
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
        this.permissionService.set(this.objectType, this.roleInfo.id, acl, event.checked).subscribe(result => {
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
                this.openSnackBar(this.translateService.instant('admin.system.role.notify.updateSuccess'), '')
                return;
            }
			this.openSnackBar(this.translateService.instant('admin.system.role.notify.updateFailed'), '')
        });
    }

	changeTab(event: MatTabChangeEvent) {
		switch (event.index) {
			case 0:
				this.tabCurrent = 'permission-tab-role-info';
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
