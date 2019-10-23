import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/service/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/model/Room';
import { Chair } from 'src/app/model/chair';
import { ChairServiceService } from 'src/app/service/chair-service';

@Component({
  selector: 'app-romm-detail',
  templateUrl: './romm-detail.component.html',
  styleUrls: ['./romm-detail.component.css']
})
export class RommDetailComponent implements OnInit {
  room: Room;
  id: number;
  chairs: Chair[] = [];
  rows: number[] = [1, 2, 3, 4, 5, 6];
  columns: number[] = [1, 2, 3, 4, 5, 6];
  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute, private chairService: ChairServiceService) { }

  ngOnInit() {
    this.room = new Room();
    this.id = this.route.snapshot.params['room.idRoom'];
    this.roomService.getRoomByID(this.id)
      .subscribe(data => {
        this.room = data;
        console.log(this.room)
      })

    this.chairService.getchairs()
      .subscribe((data: Chair[]) => {
        data.forEach(element => {
          this.chairs.push(element)
        })
      })
  }
  changeStatus(row: number, column: number) {
    for (let i = 0; i < this.chairs.length; i++) {
      if ((this.chairs[i].column == column) && (this.chairs[i].row == row)) {
        (this.chairs[i].idChairDetail==1)?this.chairs[i].idChairDetail++:this.chairs[i].idChairDetail--;
      }
    }
  }
}
