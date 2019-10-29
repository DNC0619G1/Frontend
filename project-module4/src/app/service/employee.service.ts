import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly API_URL = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_URL}/employees`);
  }
  createEmployee(employee: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(`${this.API_URL}/employees`, employee);
  }
  getEmployeeByIdEmployee(idEmployee: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/employees/details/${idEmployee}`);
  }
  updateEmployee(idEmployee:number, employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.API_URL}/employees/update/${idEmployee}`, employee);
  }
  // createEmployee(employee: Partial<Employee>): Observable<Employee> {
  //   return this.http.post<Employee>(this.API_URL, employee);
  // }
  deleteEmployee(idEmployee:number): Observable<any>{
    return this.http.delete(`${this.API_URL}/employees/delete/${idEmployee}`);
  }
}
