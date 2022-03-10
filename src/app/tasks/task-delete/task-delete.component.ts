import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.scss']
})
export class TaskDeleteComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  delete(id: number) {
    this.taskService.delete(id).subscribe(result => {
      //TODO avisar o usuário da exclusão do registro
    });
  }

}
