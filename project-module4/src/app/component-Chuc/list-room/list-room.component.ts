import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/service/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/model/Room';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {
  rooms: Room[] = [];
  constructor(private titleService: Title,private roomService: RoomService, private router: Router, private route: ActivatedRoute, ) { 
    this.titleService.setTitle("Danh sách phòng chiếu")
  }

  ngOnInit() {
    this.roomService.getRooms().subscribe((data: Room[]) => {
      data.forEach(element => { this.rooms.push(element) })
    })
  }
  searchNameRoom(nameRoom) {
    this.rooms = [];
    if ((nameRoom == "")||((nameRoom == "&sbnp"))) {
      this.roomService.getRooms().subscribe((data: Room[]) => {
        data.forEach(element => { this.rooms.push(element) })
      })
      }
    else {
      this.roomService.searchNameRoon(nameRoom).subscribe(
        (data: Room[]) => {
          data.forEach(element => { this.rooms.push(element) })
        })
    }
  }
}
