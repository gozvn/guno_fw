import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutDefaultComponent} from "./modules/core/layouts/default/default.component";
import {
    LayoutDefaultSidebarVerticalComponent
} from "./modules/core/layouts/default-sidebar-vertical/default-sidebar-vertical.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
    },
    {
        path: 'warehouse',
        component: LayoutDefaultSidebarVerticalComponent,
        loadChildren: () => import('./modules/warehouse/warehouse.module').then(m => m.WarehouseModule)
    },
    {
        path: 'tuan',
        component: LayoutDefaultComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./tuan/tuan.component').then(m => m.TuanComponent)
            }
        ]
    },
    {
        path: 'error',
        component: LayoutDefaultComponent,
        loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
    },
    /**
     * Page 404
     */
    { path: '**', redirectTo: 'error/404-page-not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload'
    })],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule {
}
