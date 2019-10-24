import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/Room';
import { RoomService } from 'src/app/service/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creat-room',
  templateUrl: './creat-room.component.html',
  styleUrls: ['./creat-room.component.css']
})
export class CreatRoomComponent implements OnInit {
  room: Room = new Room();
  constructor(private roomService: RoomService, private router: Router) { }
  submitted = false;
  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    this.roomService.createRoom(this.room).subscribe(data => this.router.navigate(['/rooms']))
  }
}