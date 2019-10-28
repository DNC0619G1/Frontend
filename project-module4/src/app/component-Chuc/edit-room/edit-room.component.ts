import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/service/room.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  room:Room=new Room();
  idRoom:number;
  constructor(private route: ActivatedRoute,private router: Router,
    private roomService: RoomService) {
     }
  ngOnInit() {
    this.idRoom = this.route.snapshot.params['idRoom'];
    this.roomService.getRoomByID(this.idRoom)
    .subscribe(data => {
        this.room = data;
      }, error => console.log(error)
    )
  }
  updateRoom() {
    this.roomService.createRoom(this.room)
      .subscribe(data => this.router.navigate(['/rooms']), error => console.log(error));
  }
}
