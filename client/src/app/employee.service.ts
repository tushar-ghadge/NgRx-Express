import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Employee } from './store/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_URL = "/api/getEmpList";
  constructor(private http: HttpClient) { }

  getEmployeeList(){
    return this.http.get<Employee[]>(this.API_URL)
    .pipe(
      delay(500)
    )
  }
}
