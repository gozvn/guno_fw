import {Component, Inject, Injector, OnInit} from '@angular/core';
import { BaseComponent } from '../../../../../../core/components/base-component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../../../../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../services/system.user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../../../../../../validations/password.validation';
import { HelperService } from '../../../../../../../services/helper.service';
import { environment } from '../../../../../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { htmlTagValidator, whiteSpaceValidator } from '../../../../../../../validations/custom.validation';

@Component({
  selector: 'app-admin-dialog-system-create-user',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class AdminDialogSystemCreateUserComponent extends BaseComponent implements OnInit {
	formUser: FormGroup;
	statusActive = 1;
	defaultRole = 3;
	statuses: any[] = [];
	roles: any[] = [];
	isShowPassword: boolean = false;
	environment = environment;
	constructor(
		public override activeRoute: ActivatedRoute,
		public override translateService: TranslateService,
		public override authenticationService: AuthenticationService,
		public override injector: Injector,
		public dialogRef: MatDialogRef<AdminDialogSystemCreateUserComponent>,
		private helperService: HelperService,
		@Inject(MAT_DIALOG_DATA) public data: {roles: [], statuses: []},
		private userService: UserService,
		private snackBar: MatSnackBar,
		private fb: FormBuilder
	) {
		super(activeRoute, translateService, authenticationService, injector);
		this.statuses = this.data.statuses ?? [];
		this.roles = this.data.roles ?? [];
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.initForm();
	}

	initForm() {
		this.formUser = this.fb.group({
			fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255), htmlTagValidator, whiteSpaceValidator(5)]],
			status: [this.statusActive, [Validators.required]],
			role: [this.defaultRole, [Validators.required]],
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
			password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,30}$/)]],
            confirmPassword: [''],
		}, {
			
            validator: PasswordValidation.MatchPassword
		})
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			horizontalPosition: 'end',
			verticalPosition: 'top',
			duration: 10 * 1000,
		});
	}

	save() {
		const encryptBody = this.environment.rsa.isActive || false;
		if (this.formUser.valid) {
            this.userService.create(this.formUser.value, encryptBody).subscribe((result) => {
                if (result.status === 1) {
					this.openSnackBar(this.translateService.instant('admin.system.user.notify.createSuccess'), '')
                    this.dialogRef.close(true);
                    return;
                }

				this.openSnackBar(this.translateService.instant('admin.system.user.notify.createFailed'), '')
            })
        }
	}

	isValid() {
		return this.formUser.valid;
	}

	generatePassword() {
        const password = this.helperService.generatePassword(12);
        this.formUser.controls['password'].setValue(password);
        this.formUser.controls['confirmPassword'].setValue(password)
    }
}
