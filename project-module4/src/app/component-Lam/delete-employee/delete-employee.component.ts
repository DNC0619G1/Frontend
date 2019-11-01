import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Employee } from 'src/app/model/Employee';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { windowCount } from 'rxjs/operators';
@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
  employee : Employee = new Employee();
  employeeForm: FormGroup;
  idEmployee = +this.route.snapshot.paramMap.get('idEmployee');
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Xóa Nhân Viên " + this.idEmployee);
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
  }
  deleteEmployee(){
    this.employeeService.deleteEmployee(this.idEmployee).subscribe();
    // this.router.navigate(['/admin/employeeList']);
  }
  confirm(){
    this.router.navigate(['/admin/employeeList']);
    // window.location.reload();
  }
}
