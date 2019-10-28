import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  p: number = 1;
  constructor(
    private titleService: Title,
    private employeeService: EmployeeService,
    private router: Router,
  ) {
    this.titleService.setTitle("Danh Sách Nhân Viên ");
  }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      data.forEach(element => {
        this.employees.push(element);
      });
    });
    this.router.navigateByUrl('/admin/employeeList', { skipLocationChange: true });
    this.router.navigate(["/admin/employeeList"]);
  }

}
