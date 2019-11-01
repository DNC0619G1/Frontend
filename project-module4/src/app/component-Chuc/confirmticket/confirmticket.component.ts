import { Component, OnInit } from '@angular/core';
import { ShowTime } from 'src/app/model/ShowTimes';
import { ShowTimesService } from 'src/app/service/show-times.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Chair } from 'src/app/model/chair';
import { ChairServiceService } from 'src/app/service/chair-service';
import { UsersService } from 'src/app/service/users.service';
import { BookingService } from 'src/app/service/booking.service';
import { Booking } from 'src/app/model/Booking';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmticket',
  templateUrl: './confirmticket.component.html',
  styleUrls: ['./confirmticket.component.css']
})
export class ConfirmticketComponent implements OnInit {
  showTimes: ShowTime[];
  chairs: Chair[] = [];
  chairListChoise: number[] = [];
  time: ShowTime = new ShowTime();
  idTime: number;
  pointChange: number = 0;
  users: User[] = [];
  user: User;
  priceSum: number = 0;
  booking: Booking=new Booking();
  constructor(private chairService: ChairServiceService, private router: Router, private route: ActivatedRoute,
    private showTimesService: ShowTimesService, private usersService: UsersService, private bookingService: BookingService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }
  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data: User[]) => {
      data.forEach(element => { this.users.push(element) })
    });

    this.idTime = this.route.snapshot.params['time.idTime'];
    this.showTimesService.getShowTimeById(this.idTime).subscribe(data => {
      this.time = data;
      this.booking.showTime = data;
    })
    let test = this.route.snapshot.paramMap.get('chairListChoise').split(",");
    let test1 = test[0].split("[");
    this.chairListChoise.push(parseInt(test1[1]));
    for (let i = 1; i < test.length; i++) {
      this.chairListChoise.push(parseInt(test[i]))
    }
    this.chairService.getchairs().subscribe((data: Chair[]) => {
      data.forEach(element => {
        if (this.time.room.idRoom == element.room.idRoom) {
          this.chairs.push(element)
        }
      })
      for (let i = 0; i < this.chairs.length; i++) {
        for (let j = 0; j < this.chairListChoise.length; j++) {
          if (this.chairs[i].idChair == this.chairListChoise[j]) {
            this.priceSum += this.chairs[i].priceChairType + this.time.showTime.priceTime;
          }
        }
      }
    });
  }
  checkMember(memberId: number) {
    let isFind = false;
    for (let i = 0; i < this.users.length; i++) {
      if ((this.users[i].idUser == memberId) || (this.users[i].license == memberId)) {
        isFind = true;
        this.user = this.users[i];
        this.booking.user=this.user;
      }
    }
    if (!isFind) {
      this.user = null;
    }
  }
  onItemChange(valueChange: number) {
    this.pointChange = valueChange;
  }
  confirmChair() {
    this.booking.bookingDate=new Date();
    // this.booking.bookingDate=this.datePipe.transform(this.booking.bookingDate, 'yyyy-MM-dd');
    console.log(this.booking);
    //this.bookingService.createbooking(this.booking).subscribe(next=>{
      window.alert("Bạn đã mua vé thành công. Thông tin chi tiết như sau");
    this.router.navigate(['/thongtinbanve', this.time.idTime, JSON.stringify(this.chairListChoise), this.user.idUser, this.pointChange])
    //
  }
}
