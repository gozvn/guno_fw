import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {AdminRoutingModule} from "./admin-routing.module";
import {TablerIconsModule} from "angular-tabler-icons";
import {QuillModule} from 'ngx-quill'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../shared/modules/pipes.module";
import {DateAdapter, provideNativeDateAdapter} from "@angular/material/core";
import {
    DateRange,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
    MatDateRangeSelectionStrategy
} from "@angular/material/datepicker";
import {SharedModule} from "../../shared/shared.module";
import {NgScrollbarModule} from "ngx-scrollbar";
import { AdminSystemUserComponent } from './pages/system/user/user.component';
import { AdminSystemRoleComponent } from './pages/system/role/role.component';
import { AdminDialogSystemCreateUserComponent } from './pages/system/user/dialogs/create/create.component';
import { AdminDialogSystemCreateRoleComponent } from './pages/system/role/dialogs/create/create.component';
import { AdminSystemRouteComponent } from './pages/system/route/route.component';
import { AdminDialogSystemPermissionUserComponent } from './pages/system/user/dialogs/permission/permission.component';
import { AdminDialogSystemPermissionRoleComponent } from './pages/system/role/dialogs/permission/permission.component';

@Injectable()
export class FiveDayRangeSelectionStrategy<D>
    implements MatDateRangeSelectionStrategy<D>
{
    constructor(private _dateAdapter: DateAdapter<D>) {}

    selectionFinished(date: D | null): DateRange<D> {
        return this._createFiveDayRange(date);
    }

    createPreview(activeDate: D | null): DateRange<D> {
        return this._createFiveDayRange(activeDate);
    }

    private _createFiveDayRange(date: D | null): DateRange<D> {
        if (date) {
            const start = this._dateAdapter.addCalendarDays(date, -2);
            const end = this._dateAdapter.addCalendarDays(date, 2);
            return new DateRange<D>(start, end);
        }

        return new DateRange<D>(null, null);
    }
}

@NgModule({
    declarations: [
        //admin system
        AdminSystemUserComponent,
        AdminSystemRoleComponent,
        AdminSystemRouteComponent,
        // Dialogs
        AdminDialogSystemCreateUserComponent,
        AdminDialogSystemCreateRoleComponent,
        AdminDialogSystemPermissionUserComponent,
        AdminDialogSystemPermissionRoleComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        MaterialModule,
        PipesModule,
        TranslateModule,
        TablerIconsModule,
        SharedModule,
        NgScrollbarModule,
        QuillModule.forRoot()
    ],
    exports: [],
    providers: [
        provideNativeDateAdapter(),
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: FiveDayRangeSelectionStrategy,
        }
    ]
})
export class AdminModule {
}
