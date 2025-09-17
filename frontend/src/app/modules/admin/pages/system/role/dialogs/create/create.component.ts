import {Component, Inject, Injector, OnInit} from '@angular/core';
import { BaseComponent } from '../../../../../../core/components/base-component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../../../../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../../../services/system.role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { RoleModel } from '../../../../../models/role.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { htmlTagValidator, whiteSpaceValidator } from '../../../../../../../validations/custom.validation';

@Component({
  selector: 'app-admin-dialog-system-create-role',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class AdminDialogSystemCreateRoleComponent extends BaseComponent implements OnInit {
	statuses = [];
	listPermissionLocked = [1, 0];
	formRole: FormGroup;

	constructor(
			public override activeRoute: ActivatedRoute,
			public override translateService: TranslateService,
			public override authenticationService: AuthenticationService,
			public override injector: Injector,
			public dialogRef: MatDialogRef<AdminDialogSystemCreateRoleComponent>,
			@Inject(MAT_DIALOG_DATA) public data: {statuses: [], listPermissionLocked: []},
			private roleService: RoleService,
			private fb: FormBuilder,
			private snackBar: MatSnackBar
		) {
			super(activeRoute, translateService, authenticationService, injector);
			this.statuses = this.data.statuses ?? [];
			this.dialogRef.keydownEvents().subscribe(event => {
				if (event.key === "Escape") {
					this.dialogRef.close();
				}
			});
	
			this.statuses = data.statuses;
			this.listPermissionLocked = data.listPermissionLocked;
			this.formRole = this.fb.group({
				name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255), htmlTagValidator, whiteSpaceValidator(3)]],
				status: [1, [Validators.required]],
				permissionLocked: [0, [Validators.required]]
			});
	
			this.formRole.controls['name'].valueChanges.pipe(debounceTime(300))
				.subscribe((value) => {
					this.checkNameExist(value);
				});
			this.formRole.get('name')?.setErrors({ existed: false });
		}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			horizontalPosition: 'end',
			verticalPosition: 'top',
			duration: 10 * 1000,
		});
	}

	checkNameExist(name: any) {
		if (this.formRole.invalid) {
			return;
		}

		this.loadingState = false;
		this.roleService.checkNameExist(name).subscribe(result => {
			if (result.count > 0) {
				this.formRole.get('name')?.setErrors({ existed: true });
			} else {
				this.formRole.get('name')?.setErrors(null);
			}
		});
	}

	isValid() {
		return this.formRole.valid
	}

	save() {
		if (this.formRole.valid) {
			this.loadingState = true;
			const body = {
				name: this.formRole.controls['name'].value.trim(),
				status: this.formRole.controls['status'].value,
				permissionLocked: this.formRole.controls['permissionLocked'].value
			}
			this.roleService.create(new RoleModel(body)).subscribe((result: any) => {
				this.loadingState = false;
				if (result) {
					this.openSnackBar(this.translateService.instant('admin.system.role.notify.createSuccess'), '')
					this.dialogRef.close(true);
					return;
				}
				this.openSnackBar(this.translateService.instant('admin.system.role.notify.createFailed'), '')
			});
		}
	}
}
