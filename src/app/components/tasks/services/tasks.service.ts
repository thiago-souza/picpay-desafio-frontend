import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Tasks } from "../model/tasks";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

export interface TasksData {
  items: Tasks[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private readonly API = "http://localhost:3000/tasks";

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Tasks[]> {
    return this.httpClient.get<Tasks[]>(this.API);
  }

  findAll(page: number, size: number): Observable<Tasks> {
    let params = new HttpParams();

    params = params.append("_page", String(page));
    params = params.append("_limit", String(size));

    return this.httpClient.get<Tasks>(this.API, { params }).pipe(
      map((tasksData: Tasks) => tasksData),
      catchError((err) => throwError(err))
    );
  }
  
  register(task: Tasks): Observable<Tasks> {
    return this.httpClient.post<Tasks>(`${this.API}`, task);
  }

  update(task: Tasks): Observable<Tasks> {
    return this.httpClient.put<Tasks>(`${this.API}/${task.id}`, task);
  }

  delete(task: Tasks): Observable<{}> {
    return this.httpClient.delete(`${this.API}/${task.id}`);
  }
}
