import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { TaskDeleteComponent } from './task-delete/task-delete.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskDeleteComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class TasksModule { }
