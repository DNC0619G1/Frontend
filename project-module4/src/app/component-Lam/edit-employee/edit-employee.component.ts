import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Employee } from 'src/app/model/Employee';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  employeeForm: FormGroup;
  submitted = false;
  show: boolean;
  idEmployee = +this.route.snapshot.paramMap.get('idEmployee');
  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private _fb: FormBuilder,
    private router: Router,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Chỉnh Sửa Nhân Viên " + this.idEmployee);
  }

  editForm() {
    this.employeeForm = this._fb.group({
      imageEmployee: new FormControl(),
      accountEmployee: new FormControl(),
      passwordEmployee: new FormControl('', [Validators.required, Validators.minLength(6)]),
      nameEmployee: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthDayEmployee: new FormControl(''),
      sexEmployee: new FormControl(''),
      emailEmployee: new FormControl('', [Validators.required, Validators.email]),
      licenseEmployee: new FormControl('', [Validators.required, Validators.min(100000), Validators.max(9999999999)]),
      numberPhoneEmployee: new FormControl('', [Validators.required, Validators.min(100000), Validators.max(9999999999)]),
      addressEmployee: new FormControl('', [Validators.required]),
    });
  }
  get f() { return this.employeeForm.controls; }
  ngOnInit() {
    const idEmployee = +this.route.snapshot.paramMap.get('idEmployee');
    this.employeeService.getEmployeeByIdEmployee(idEmployee).subscribe(
      next => (this.employee = next,
        this.employeeForm.patchValue(next)),
      error => {
        console.log(error);
        this.employee = null;
      },
    );
    this.editForm();
  }
  // newPassword: String, verifyPassword: String
  update() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      this.show = false;
      console.log(this.show);
      return;
    }
    else {
      this.show = true;
      this.employeeService.updateEmployee(this.idEmployee, this.employeeForm.value).subscribe(
        // data => this.router.navigate(['/admin/employeeList'])
      );
      console.log(this.show);
      console.log(this.employeeForm.value);
    }

  }
  confirm() {
    this.router.navigate(['/admin/employeeList']);
    // window.location.reload();
  }
  
  backClicked() {
    this._location.back();
  }
}
 // if(newPassword != verifyPassword){
    //   verifyPassword = "Xác Nhận Mật Khẩu Không Đúng";
    //   alert("verifyPassword")
    // }
