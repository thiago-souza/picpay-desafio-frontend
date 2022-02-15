import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogBoxComponent } from "../../../components/dialog-box/dialog-box.component";

import { Tasks } from "../model/tasks";
import { TasksService } from "./../services/tasks.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {
  tasks: any = null;
  newTasks: any = null;
  filterValue: string = null;
  allTasks: any = null;
  displayedColumns = ["name", "title", "date", "value", "isPayed", "action"];
  dataSource = new MatTableDataSource<Tasks>();
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tasksService: TasksService,
    public matSnackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initDataSource();
    this.updateList();
  }

  initDataSource() {
    this.tasksService
      .findAll(1, 5)
      .pipe(map((tasksData: Tasks) => (this.tasks = tasksData)))
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource<any>(this.tasks);
        this.dataSource.sort = this.sort;
      });
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    if (this.filterValue == null) {
      page = page + 1;
      this.tasksService
        .findAll(page, size)
        .pipe(map((tasksData: Tasks) => (this.tasks = tasksData)))
        .subscribe((response) => {
          this.dataSource = new MatTableDataSource<any>(this.tasks);
          this.dataSource.sort = this.sort;
        });
    }
  }

  updateList() {
    this.tasksService.getTasks().subscribe((result: any) => {
      this.allTasks = result.length;
    });
  }

  openDialog(action: string, data: Tasks) {
    data.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((status: any) => {
      if (data.action == "Add") {
        this.addRowData(status, data);
      } else if (data.action == "Update") {
        this.updateRowData(status, data);
      } else if (data.action == "Delete") {
        this.deleteRowData(status, data);
      }
    });
  }

  addRowData(status, data) {
    this.newTasks = {
      ...data,
      name: status[0],
      value: status[1],
      date: status[2],
      title: status[3],
      id: data.id,
    };
    if (status) {
      this.tasksService.register(this.newTasks).subscribe(
        (response) => {
          this.matSnackBar.open("Cadastrado com sucesso!", null, {
            duration: 5000,
            panelClass: "green-snackbar",
          });
          if (response) {
            this.dataSource.data = [response];
            this.updateList();
          }
        },
        (error) => {
          this.matSnackBar.open("Erro ao cadastrar", null, {
            duration: 5000,
            panelClass: "red-snackbar",
          });
        }
      );
    }
  }

  updateRowData(status, data) {
    this.newTasks = {
      ...data,
      name: status[0],
      value: status[1],
      date: status[2],
      title: status[3],
      id: data.id,
    };
    if (status) {
      this.tasksService.update(this.newTasks).subscribe(
        (response) => {
          this.matSnackBar.open("Atualizado com sucesso!", null, {
            duration: 5000,
            panelClass: "green-snackbar",
          });
          if (response) {
            this.dataSource.data = [response];
          }
        },
        (error) => {
          this.matSnackBar.open("Erro ao atualizar", null, {
            duration: 5000,
            panelClass: "red-snackbar",
          });
        }
      );
    }
  }

  deleteRowData(status, data) {
    if (status) {
      this.tasksService.delete(data).subscribe(
        (response) => {
          this.matSnackBar.open("Item deletado com sucesso!", null, {
            duration: 5000,
            panelClass: "green-snackbar",
          });

          if (response !== "") {
            this.updateList();
          }
        },
        (error) => {
          this.matSnackBar.open("Erro ao deletar", null, {
            duration: 5000,
            panelClass: "red-snackbar",
          });
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
