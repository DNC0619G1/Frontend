import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../model/user';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-management-info',
  templateUrl: './management-info.component.html',
  styleUrls: ['./management-info.component.css']
})

export class ManagementInfoComponent implements OnInit {
  [x: string]: any;
  user: User;
  // @ViewChild('foo', {static: true}) foo: ElementRef;
  userForm: FormGroup;

  idUser = +this.route.snapshot.paramMap.get('idUser');
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private _fb: FormBuilder,
    private router: Router,
    private titleService: Title,
  ) { 
    this.titleService.setTitle("Thông Tin Member");
  }
  editForm() {
    this.userForm = this._fb.group({
      fullName: new FormControl(''),
      birthDay: new FormControl(''),
      sex: new FormControl(''),
      email: new FormControl(''),
      license: new FormControl(''),
      numberPhone: new FormControl(''),
      address: new FormControl(''),
      password: new FormControl(''),
    });

  }
  // ngOnInit() {

  //   this.route.params.subscribe(params => {
  //     this.idUser = params['iderUser'];
  //     console.log(this.idUser)
  //   })
  //   this.getUser();
  //   this.editForm();
  //   console.log(this.userForm)
  // }
  ngOnInit() {
    const idUser = +this.route.snapshot.paramMap.get('idUser');
    this.usersService.getUserByIdUser(idUser).subscribe(
      next => (this.user = next),
      error => {
        console.log(error);
        this.user = null;
      },
    );
    
    // this.getUser();
    this.editForm();
  }

  // getUser(){
  //   this.usersService.getPostByIdUser(this.idUser).subscribe(data => {
  //     this.userForm.patchValue(data);
  //     console.log(this.userForm);
  //   })
  // }
  checkOldPassword = "";
  checkNewPassword = "";
  updatePassword(password: String, oldPassword: String, newPassword: String, verifyPassword: String) {
    if (oldPassword != password) {
      this.checkOldPassword = "Mật Khẩu Cũ Không Đúng";
      alert(this.checkOldPassword);
    }
    else if (newPassword != verifyPassword) {
      this.checkNewPassword = "Xác Nhận Mậu Khẩu Không Đúng";
      alert(this.checkNewPassword);
    }
    else {
      this.usersService.updateUserPassword(this.userForm.value, this.idUser).subscribe();
    }
    window.location.reload();
    console.log(this.userForm.value);
  }
  update() {
    this.usersService.updateUser(this.userForm.value, this.idUser).subscribe();
    alert("Cập Nhập Thông Tin Thành Công");
    window.location.reload();
    console.log(this.userForm.value);
  }

}
