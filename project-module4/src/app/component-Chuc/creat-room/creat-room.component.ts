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
  room:Room=new Room();
  constructor(private roomService: RoomService, private router: Router) { }
  submitted = false;
  ngOnInit() {
  }
  newEmployee(): void {
    this.submitted = false;
    this.room = new Room();
  }
  createRoom(){
    this.roomService.createRoom(this.room).subscribe(data => console.log(data), error => console.log(error))
    this.room = new Room();    
    this.router.navigate(['/rooms']);
  }
  onSubmit() {
    this.submitted = true;
    this.createRoom();    
  }
}