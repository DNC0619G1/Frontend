import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Employee } from 'src/app/model/Employee';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.css']
})
export class InsertEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  employeeForm: FormGroup;
  submitted = false;
  show: boolean;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _location: Location,
    private employeeService: EmployeeService) {
    this.titleService.setTitle("Thêm Mới Nhân Viên");

  }
  createEmployeeForm() {
    this.employeeForm = this.fb.group({
      imageEmployee: new FormControl('', [Validators.required]),
      accountEmployee: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordEmployee: new FormControl('', [Validators.required, Validators.minLength(6)]),
      nameEmployee: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthDayEmployee: new FormControl('', [Validators.required]),
      sexEmployee: new FormControl('Man'),
      emailEmployee: new FormControl('', [Validators.required, Validators.email]),
      licenseEmployee: new FormControl('', [Validators.required, Validators.min(100000), Validators.max(9999999999)]),
      numberPhoneEmployee: new FormControl('', [Validators.required, Validators.min(100000), Validators.max(9999999999)]),
      addressEmployee: new FormControl('', [Validators.required]),
    });

  }
  get f() { return this.employeeForm.controls; }

  ngOnInit() {
    this.createEmployeeForm();
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
  // onchange() {
  //   this.submitted = true;
  //   if (this.employeeForm.invalid) {
  //     return;
  //   }
  // }
  create() {
    this.submitted = true;
    
    if (this.employeeForm.invalid) {
      this.show = false;
      console.log(this.show);
      return;
    }
    else {
      this.show = true;
      this.employeeService.createEmployee(this.employeeForm.value).subscribe();
      this.employee = new Employee();
      // this.router.navigate(['/admin/employeeList']);
      console.log(this.employeeForm.value);
      console.log(this.show);
    }
  }
  // create() {
  //   if(this.submitted = true){
  //     this.show = false;
  //   }
  //   else{
  //     this.createEmployee();
  //   }

  // }
  confirm() {
    this.router.navigate(['/admin/employeeList']);
    // window.location.reload();
  }
  backClicked() {
    this._location.back();
  }
}