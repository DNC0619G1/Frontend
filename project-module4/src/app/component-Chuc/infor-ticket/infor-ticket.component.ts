import { Component, OnInit } from '@angular/core';
import { ShowTimesService } from 'src/app/service/show-times.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowTime } from 'src/app/model/ShowTimes';
import { User } from 'src/app/model/user';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Chair } from 'src/app/model/chair';
import { UsersService } from 'src/app/service/users.service';
import { Movie } from 'src/app/Model/movie';
import { Room } from 'src/app/model/Room';
import { TimeFrame } from 'src/app/model/TimeFrame';

@Component({
  selector: 'app-infor-ticket',
  templateUrl: './infor-ticket.component.html',
  styleUrls: ['./infor-ticket.component.css']
})
export class InforTicketComponent implements OnInit {
  idUser: number;
  showTimes: ShowTime[];
  chairs: Chair[] = [];
  chairListChoise: number[] = [];
  time: ShowTime;
  idTime: number;
  pointChange: number;
  users: User[];
  user: User;
  priceSum: number = 0;
  idRoom: number = 0;
  constructor(private chairService: ChairServiceService, private router: Router, private route: ActivatedRoute, private usersService: UsersService,
    private showTimesService: ShowTimesService, ) { }

  ngOnInit() {
    this.time = new ShowTime();
    this.time.movie = new Movie();
    this.time.room = new Room();
    this.time.showTime = new TimeFrame();
    this.idTime = this.route.snapshot.params['time.idTime'];
    this.showTimesService.getShowTimeById(this.idTime).subscribe(data => {
      this.time = data;
      this.idRoom = this.time.room.idRoom;
    });
    this.pointChange = this.route.snapshot.params['pointChange'];
    let test = this.route.snapshot.paramMap.get('chairListChoise').split(",");
    let test1 = test[0].split("[");
    this.chairListChoise.push(parseInt(test1[1]));
    for (let i = 1; i < test.length; i++) {
      this.chairListChoise.push(parseInt(test[i]))
    }
    this.chairService.getChairsByIdRoom(this.idRoom).subscribe((data: Chair[]) => {
      this.chairs = data;
      for (let i = 0; i < this.chairs.length; i++) {
        for (let j = 0; j < this.chairListChoise.length; j++) {
          if (this.chairs[i].idChair == this.chairListChoise[j]) {
            this.priceSum += this.chairs[i].priceChairType + this.time.showTime.priceTime;
          }
        }
      }
    });
    this.route.paramMap.subscribe(params => {
      this.user = new User();
      this.idUser = this.route.snapshot.params[('user.id')];
      this.usersService.getUserByIdUser(this.idUser).subscribe(data => {
          this.user = data;
        })
    });
  }
}
