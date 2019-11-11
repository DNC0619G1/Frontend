import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/service/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/model/Room';
import { Chair } from 'src/app/model/chair';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-romm-detail',
  templateUrl: './romm-detail.component.html',
  styleUrls: ['./romm-detail.component.css']
})
export class RommDetailComponent implements OnInit {
  room: Room;
  idRoom: number;
  rowColumnMap: Map<number, number[]>=new Map<0, []>();
  chairs: Chair[] = [];
  constructor(private titleService: Title,private roomService: RoomService, private router: Router, private route: ActivatedRoute, private chairService: ChairServiceService) { 
    this.titleService.setTitle("phòng")
  }

  ngOnInit() {
    this.room = new Room();
    this.idRoom = this.route.snapshot.params['idRoom'];
    this.roomService.getRoomByID(this.idRoom)
      .subscribe(data => {
        this.room = data;
      })
    this.chairService.getchairs().subscribe((data: Chair[]) => {
        data.forEach(element => {
          if (this.idRoom == element.room.idRoom) {
            this.chairs.push(element)
            if (this.rowColumnMap.get(element.row) == null) {
              this.rowColumnMap.set(element.row, [element.column]);
            } else {
              this.rowColumnMap.get(element.row).push(element.column);
            }
          }
        })
        this.rowColumnMap.forEach((value: number[], key: number) => {
          value.sort();
      });
      })
  }
  changeStatus(idChair: number) {
    for (let i = 0; i < this.chairs.length; i++) {
      if (this.chairs[i].idChair == idChair ) {
        continue;
      }
    }
    this.router.navigate(['/chairdetail',this.idRoom,idChair])
  }
}