import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/Room';
import { RoomService } from 'src/app/service/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-creat-room',
  templateUrl: './creat-room.component.html',
  styleUrls: ['./creat-room.component.css']
})
export class CreatRoomComponent implements OnInit {
  roomForm: FormGroup;
  room: Room = new Room();
  submitted = false;
  constructor(private titleService: Title,private roomService: RoomService, private router: Router,private route: ActivatedRoute,private fb: FormBuilder) { }
  ngOnInit() {
    this.titleService.setTitle("tạo phòng mới")
    this.createForm();
  }
  get f() { return this.roomForm.controls; }
  createForm() {
    this.roomForm = this.fb.group({
      nameRoom: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(30)]),
      description: new FormControl('', [Validators.required,Validators.minLength(3)]),
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.roomForm.invalid) {
      return;
    }else{
      window.alert("Ban đã thêm công phòng "+ this.roomForm.get("nameRoom").value);
      this.roomService.createRoom(this.roomForm.value).subscribe(data => this.router.navigate(['/rooms']))
    }
  }
}