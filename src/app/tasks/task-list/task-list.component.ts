import * as moment from 'moment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { TaskComponent } from '../task/task.component';
import { TaskDeleteComponent } from '../task-delete/task-delete.component';

//import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tableColumns: string[] = ['user', 'title', 'date', 'value', 'isPayed', 'actions'];
  dataSource = new MatTableDataSource([]);

  //@ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  paginatorOptions = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100],
    itemsPerPageLabel: 'Exibir'
  }

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasks();
  }

  // TODO: Esta implementação de filtro não está ideal. 
  // O correto seria fazer essa operação no back-end para que 
  // o usuário pudesse ver todos os resultados filtrados e paginados;
  // O que faço aqui é filtrar apenas os resultados da página sendo exibida
  filter(event) {
    let filterString: string = event.target.value;
    if (filterString) {
      filterString = filterString.trim().toLowerCase();
      this.dataSource.filterPredicate = 
        (task: Task, filterString: string) =>  
          task.username.trim().toLowerCase().includes(filterString) 
          || task.name.trim().toLowerCase().includes(filterString)  
      this.dataSource.filter = filterString;
    }
    else {
      this.dataSource.filterPredicate = null;
      this.dataSource.filter = null;
    }
  }

  getTasks(page: number = null, limit: number = null): void {
    this.taskService.get(page, limit).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })  
  }

  formatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }

  openModal(type: string, task: Task = null) {
    switch(type) {
      case 'CREATE':
        this.dialog.open(TaskComponent, {

        });
        break;
      case 'DELETE':
        this.dialog.open(TaskDeleteComponent, {

        });
        break;
      case 'EDIT':
        this.dialog.open(TaskComponent, {

        }) 
        break;
      default:
        break;   

    }
  }

}
