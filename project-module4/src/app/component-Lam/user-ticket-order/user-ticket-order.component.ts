import { Component, OnInit } from '@angular/core';
import { ShowTime } from 'src/app/model/ShowTimes';
import { Chair } from 'src/app/model/chair';
import { User } from 'src/app/model/user';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { ShowTimesService } from 'src/app/service/show-times.service';

@Component({
  selector: 'app-user-ticket-order',
  templateUrl: './user-ticket-order.component.html',
  styleUrls: ['./user-ticket-order.component.css']
})
export class UserTicketOrderComponent implements OnInit {
  idUser: number;
  showTimes: ShowTime[];
  chairs: Chair[] = [];
  chairListChoise: number[] = [];
  time: ShowTime;
  idTime: number;
  pointChange: number;
  amountVip: number = 0;
  users: User[];
  user: User = new User;
  priceSum: number = 0;
  constructor(private chairService: ChairServiceService, private router: Router, private route: ActivatedRoute, private usersService: UsersService,
    private showTimesService: ShowTimesService, ) { }

  ngOnInit() {
    this.time = new ShowTime();
    this.idTime = this.route.snapshot.params['time.idTime'];
    this.showTimesService.getShowTimeById(this.idTime)
      .subscribe(data => {
        this.time = data;
      });
    let test = this.route.snapshot.paramMap.get('chairListChoise').split(",");
    let test1 = test[0].split("[");
    this.chairListChoise.push(parseInt(test1[1]));
    for (let i = 1; i < test.length; i++) {
      this.chairListChoise.push(parseInt(test[i]))
    }
    this.chairService.getchairs()
      .subscribe((data: Chair[]) => {
        data.forEach(element => {
          this.chairs.push(element)
        })
        for (let i = 0; i < this.chairs.length; i++) {
          for (let j = 0; j < this.chairListChoise.length; j++) {
            if (this.chairs[i].idChair == this.chairListChoise[j]) {
              this.priceSum += this.chairs[i].priceChairType + this.time.showTime.priceTime;
            }
          }
        }
      });
    this.idUser = +this.route.snapshot.params['user.idUser'];
    this.usersService.getUserByIdUser(this.idUser).subscribe(
      next => (this.user = next),
      error => {
        console.log(error);
        this.user = null;
      },
    );
    // this.route.paramMap.subscribe(params => {
    //   this.user = new User();
    //   this.idUser = this.route.snapshot.params[('user.idUser')];
    //   this.usersService.getUserByIdUser(this.idUser)
    //     .subscribe(data => {
    //       this.user = data;
    //     })
    //   console.log(this.user)
    // });
  }
}

