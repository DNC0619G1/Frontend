import { Component, OnInit } from '@angular/core';

import { RoomService } from 'src/app/service/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/model/Room';


@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {

  rooms:Room[]=[];
  constructor(private roomService :RoomService,private router :Router, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.roomService.getRooms().subscribe((data:Room[])=>{
      data.forEach(element=>{this.rooms.push(element)})
      console.log(this.rooms)
    })
  }

}
