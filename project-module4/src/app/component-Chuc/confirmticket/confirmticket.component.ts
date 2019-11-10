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
import { Movie } from 'src/app/Model/movie';
import { Room } from 'src/app/model/Room';
import { TimeFrame } from 'src/app/model/TimeFrame';
import { BookingdetailService } from 'src/app/service/bookingdetail.service';
import { BookingDetail } from 'src/app/model/BookingDetail';

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
  idRoom: number = 0;
  booking: Booking;
  bookingDetail: BookingDetail;
  day: Date = new Date();
  chairLists: Chair[] = [];
  constructor(private chairService: ChairServiceService, private router: Router, private route: ActivatedRoute,
    private showTimesService: ShowTimesService, private usersService: UsersService, private bookingService: BookingService, private bookingdetailService: BookingdetailService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }
  ngOnInit() {
    this.bookingDetail = new BookingDetail();
    this.booking = new Booking()
    this.time.movie = new Movie();
    this.time.room = new Room();
    this.time.showTime = new TimeFrame();
    this.usersService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
    this.idTime = this.route.snapshot.params['time.idTime'];
    this.showTimesService.getShowTimeById(this.idTime).subscribe(data => {
      this.time = data;
      this.booking.showTime = data;
      this.idRoom = this.time.room.idRoom;
    })
    this.chairService.getChairLists(this.idTime).subscribe((data: Chair[]) => {
      this.chairLists = data;
    })
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
  }
  checkMember(memberId: number) {
    let isFind = false;
    for (let i = 0; i < this.users.length; i++) {
      if ((this.users[i].idUser == memberId) || (this.users[i].license == memberId)) {
        isFind = true;
        this.user = this.users[i];
        this.booking.user = this.user;
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
    let isExist = false;
    for (let i = 0; i < this.chairLists.length; i++) {
      for (let j = 0; j < this.chairListChoise.length; j++) {
        if (this.chairLists[i].idChair == this.chairListChoise[j]) {
          isExist = true;
        }
      }
    }
    if (!isExist) {
      this.booking.bookingDate = new Date();
      this.bookingService.createbooking(this.booking).subscribe(next => {
        for (let i = 0; i < this.chairs.length; i++) {
          for (let j = 0; j < this.chairListChoise.length; j++) {
            if (this.chairs[i].idChair == this.chairListChoise[j]) {
              this.bookingDetail.booking = this.booking;
              this.bookingDetail.chair = this.chairs[i];
              this.bookingDetail.priceChair = this.time.showTime.priceTime + this.chairs[i].priceChairType;
              this.bookingdetailService.createBookingDetail(this.bookingDetail).subscribe();
            }
          }
        }
      });
      window.alert("Bạn đã mua vé thành công. Thông tin chi tiết như sau");
      this.router.navigate(['/thongtinbanve', this.time.idTime, JSON.stringify(this.chairListChoise), this.user.idUser, this.pointChange])
    }else{
      window.alert("Ghế đã đặt thành công!")
    }
  }
}
