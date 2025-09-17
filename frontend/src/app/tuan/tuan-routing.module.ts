import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuanComponent } from '../tuan/tuan.component';

const routes: Routes = [
  {
    path: '',
    component: TuanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuanRoutingModule { }
