import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuanRoutingModule } from './tuan-routing.module';
import { TuanComponent } from './tuan.component';

@NgModule({
  declarations: [
    TuanComponent
  ],
  imports: [
    CommonModule,
    TuanRoutingModule
  ]
})
export class TuanModule { }
