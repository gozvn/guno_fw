import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QueuePageDashboardComponent} from "./pages/dashboard/dashboard.component";
import {QueuePageQueueComponent} from "./pages/queue/queue.component";

const routes: Routes = [
    {
        path: 'dashboard',
        component: QueuePageDashboardComponent,
        data: { title: 'queue.dashboard.title' },
        canActivate: []
    },
    {
        path: ':queueName',
        component: QueuePageQueueComponent,
        data: { title: 'queue.dashboard.title' },
        canActivate: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QueueRoutingModule {

}
