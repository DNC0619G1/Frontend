import { Component, OnInit } from '@angular/core';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chair } from 'src/app/model/chair';
import { RoomService } from 'src/app/service/room.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'app-create-chair',
  templateUrl: './create-chair.component.html',
  styleUrls: ['./create-chair.component.css']
})
export class CreateChairComponent implements OnInit {
  room: Room;
  idRoom: number;
  chair: Chair = new Chair();
  submitted = false;
  constructor(private roomService: RoomService,private chairService: ChairServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.room = new Room();
    this.idRoom = this.route.snapshot.params['idRoom'];
    this.roomService.getRoomByID(this.idRoom)
      .subscribe(data => {
        this.room = data;
        this.chair.room=this.room;
      })
  }
  onSubmit() {
    this.submitted = true;
    this.chairService.createChair(this.chair).subscribe(data =>{
      console.log(this.chair)
      this.router.navigate(['/roomdetail',this.idRoom])
    } )
  }
  changDetail(chairDetail:number) {
    this.chair.idChairDetail =chairDetail;
    console.log(this.chair.idChairDetail)
  }
}