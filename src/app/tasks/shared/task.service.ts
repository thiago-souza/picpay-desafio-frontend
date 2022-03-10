import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  get(_page: number, _limit: number): Observable<Task[]> {
    if (_page && _limit) {
      let params = new HttpParams().appendAll({_page, _limit});
      return this.http.get<Task[]>(environment.apiURL + 'tasks', {params});
    }
    else {
      return this.http.get<Task[]>(environment.apiURL + 'tasks');
    }
  }

  post(): Observable<Task> {
    return this.http.get<Task>(environment.apiURL + 'tasks');
  }

  patch(task: Task): Observable<Task> {
    return this.http.get<Task>(environment.apiURL + 'tasks');
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiURL + 'tasks/'+id);
  }
}
