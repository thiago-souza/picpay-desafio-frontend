import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
} from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { TasksService } from "./tasks.service";

describe("TasksService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TasksService],
    })
  );

  it("should be created", () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });

  it("should have getData function", () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service.getTasks).toBeTruthy();
  });
});
