import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Employee } from 'src/app/model/Employee';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.css']
})
export class InsertEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  employeeForm: FormGroup;
  submitted = false;
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService) {
    this.titleService.setTitle("Thêm Mới Nhân Viên");

  }
  // createEmployeeForm() {
  //   this.employeeForm = this._fb.group({
  //     accountEmployee: new FormControl(''),
  //     passwordEmployee: new FormControl(''),
  //     nameEmployee: new FormControl(''),
  //     birthDayEmployee: new FormControl(''),
  //     sexEmployee: new FormControl(''),
  //     emailEmployee: new FormControl(''),
  //     licenseEmployee: new FormControl(''),
  //     numberPhoneEmployee: new FormControl(''),
  //     addressEmployee: new FormControl(''),
  //     imageEmployee: new FormControl(''),
  //   });

  // }
  ngOnInit() {
    // this.createEmployeeForm();
  }
  newEmployee() {
    this.submitted = false;
    this.employee = new Employee();
  }
  // createEmployee() {
  //   this.employeeService.createEmployee(this.employee).subscribe(data => console.log(data), error => console.log(error))
  //   this.employee = new Employee();
  //   console.log(this.employee);
  //   this.router.navigate(['/admin/employeeList']);
  // }
  createEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(
      data => this.router.navigate(['/admin/employeeList']) );
      this.employee = new Employee();
      this.router.navigate(['/admin/employeeList']);
    console.log(this.employee);
  }
  create() {
    this.submitted = true;
    this.createEmployee();    
  }
}