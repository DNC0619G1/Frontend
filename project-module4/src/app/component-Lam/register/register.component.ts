import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { User } from 'src/app/model/User';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  userForm: FormGroup;
  submitted = false;
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _location: Location,
    private userService: UsersService) {
    this.titleService.setTitle("Đắng Ký Tài Khoản");
  }
  randomString(length,chars){
    let result = '';
    for(let i = length;i>0;i--)
      result
  }
  get f() { return this.userForm.controls; }
  createUserForm() {
    this.userForm = this.fb.group({
      userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthDay: new FormControl('', [Validators.required]),
      sex: new FormControl('Man'),
      email: new FormControl('', [Validators.required, Validators.email]),
      license: new FormControl('', [Validators.required, Validators.min(100000), Validators.max(9999999999)]),
      numberPhone: new FormControl('', [Validators.required, Validators.min(100000), Validators.max(9999999999)]),
      address: new FormControl('', [Validators.required]),
    });

  }
  ngOnInit() {
    this.createUserForm();
  }
  create() {
    this.submitted = true;
    if (this.userForm.invalid) {
      // this.user = this.userForm.value;
      console.log(this.user)
      return;
    }
    this.user.userName = this.userForm.get('userName').value;
    this.user.password = this.userForm.get('password').value;
    this.user.fullName = this.userForm.get('fullName').value;
    this.user.birthDay = this.userForm.get('birthDay').value;
    this.user.sex = this.userForm.get('sex').value;
    this.user.email = this.userForm.get('email').value;
    this.user.license = this.userForm.get('license').value;
    this.user.numberPhone = this.userForm.get('numberPhone').value;
    this.user.address = this.userForm.get('address').value;
    this.user.nameMemberCard = "CGV-Test";
    this.user.point = 0;
    this.user.id_role = 3;
    this.userService.createUser(this.user).subscribe();
    this.user = new User();
    this.router.navigate(['']);
    console.log(this.user);
  }


  backClicked() {
    this._location.back();
  }

}
