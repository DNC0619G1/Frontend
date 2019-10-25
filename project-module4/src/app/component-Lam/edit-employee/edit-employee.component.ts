import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Employee } from 'src/app/model/Employee';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee : Employee;
  employeeForm: FormGroup;
  idEmployee = +this.route.snapshot.paramMap.get('idEmployee');
  constructor(
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
      accountEmployee: new FormControl(''),
      imageEmployee: new FormControl(''),
      passwordEmployee: new FormControl(''),
      nameEmployee: new FormControl(''),
      birthDayEmployee: new FormControl(''),
      sexEmployee: new FormControl(''),
      emailEmployee: new FormControl(''),
      licenseEmployee: new FormControl(''),
      numberPhoneEmployee: new FormControl(''),
      addressEmployee: new FormControl(''),
    });
  }
  ngOnInit() {
    const idEmployee = +this.route.snapshot.paramMap.get('idEmployee');
    this.employeeService.getEmployeeByIdEmployee(idEmployee).subscribe(
      next => (this.employee = next),
      error => {
        console.log(error);
        this.employee = null;
      },
    );
    this.editForm();
  }
  update(newPassword: String, verifyPassword: String) {
    if(newPassword != verifyPassword){
      verifyPassword = "Xác Nhận Mật Khẩu Không Đúng";
      alert("verifyPassword")
    }
    this.employeeService.updateEmployee( this.idEmployee,this.employeeForm.value,).subscribe(
      data => this.router.navigate(['/admin/employeeList'])
    );
    console.log(this.employeeForm.value);
  }
}
