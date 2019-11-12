import { Component, OnInit } from '@angular/core';
import { ShowTime } from 'src/app/model/ShowTimes';
import { Chair } from 'src/app/model/chair';
import { User } from 'src/app/model/user';
import { Booking } from 'src/app/model/Booking';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowTimesService } from 'src/app/service/show-times.service';
import { UsersService } from 'src/app/service/users.service';
import { BookingService } from 'src/app/service/booking.service';
import { Order } from 'src/app/model/Order';
import { OrderDetail } from 'src/app/model/OrderDetail';
import { OrderServiceService } from 'src/app/service/order-service.service'
import { OrderDetailServiceService } from 'src/app/service/order-detail-service.service';
import { Movie } from 'src/app/Model/movie';
import { Room } from 'src/app/model/Room';
import { TimeFrame } from 'src/app/model/TimeFrame';

@Component({
  selector: 'app-show-info-order-ticket-chair',
  templateUrl: './show-info-order-ticket-chair.component.html',
  styleUrls: ['./show-info-order-ticket-chair.component.css']
})
export class ShowInfoOrderTicketChairComponent implements OnInit {
  showTimes: ShowTime[];
  chairs: Chair[] = [];
  chairListChoise: number[] = [];
  time: ShowTime = new ShowTime();
  idTime: number;
  pointChange: number = 0;
  users: User[] = [];
  user: User = new User();
  priceSum: number = 0;
  booking: Booking = new Booking();
  order : Order = new Order();
  orderDetail: OrderDetail;
  idUser: number;
  chairLists: Chair[] = [];
  idRoom: number = 0;
  constructor(private chairService: ChairServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private showTimesService: ShowTimesService,
    private usersService: UsersService,
    private bookingService: BookingService,
    private orderServiceService :OrderServiceService,
    private orderDetailServiceService: OrderDetailServiceService
    ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }
  // ngOnInit() {
    // this.idUser = +this.route.snapshot.params['user.idUser'];
    // this.usersService.getUserByIdUser(this.idUser).subscribe(
    //   next => (this.user = next),
    //   error => {
    //     console.log(error);
    //     this.user = null;
    //   },
    // );
  //   this.idTime = this.route.snapshot.params['time.idTime'];
  //   this.showTimesService.getShowTimeById(this.idTime).subscribe(data => {
  //     this.time = data;
  //     this.booking.showTime = data;
  //   })
  //   let test = this.route.snapshot.paramMap.get('chairListChoise').split(",");
  //   console.log(test);
  //   let test1 = test[0].split("[");
  //   this.chairListChoise.push(parseInt(test1[1]));
  //   for (let i = 1; i < test.length; i++) {
  //     this.chairListChoise.push(parseInt(test[i]))
  //   }
  //   this.chairService.getchairs().subscribe((data: Chair[]) => {
  //     data.forEach(element => {
  //       if (this.time.room.idRoom == element.room.idRoom) {
  //         this.chairs.push(element)
  //       }
  //     })
  //     for (let i = 0; i < this.chairs.length; i++) {
  //       for (let j = 0; j < this.chairListChoise.length; j++) {
  //         if (this.chairs[i].idChair == this.chairListChoise[j]) {
  //           this.priceSum += this.chairs[i].priceChairType + this.time.showTime.priceTime;
  //         }
  //       }
  //     }
  //   });
  // }
  ngOnInit() {
    this.orderDetail = new OrderDetail();
    this.order = new Order()
    this.time.movie = new Movie();
    this.time.room = new Room();
    this.time.showTime = new TimeFrame();
    this.idUser = +this.route.snapshot.params['user.idUser'];
    this.usersService.getUserByIdUser(this.idUser).subscribe(
      next => (this.user = next),
      error => {
        console.log(error);
        this.user = null;
      },
    );
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
  // confirmChair() {
  //   this.booking.bookingDate = new Date();
  //   // this.booking.bookingDate=this.datePipe.transform(this.booking.bookingDate, 'yyyy-MM-dd');
  //   console.log(this.booking);
  //   //this.bookingService.createbooking(this.booking).subscribe(next=>{
  //   window.alert("Bạn đã Đặt Vé Thành Công. Thông tin chi tiết như sau");
  //   this.router.navigate(['/userOrderTicket', this.time.idTime,this.user.idUser, JSON.stringify(this.chairListChoise)])
  //   //
  // }
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
      this.order.dateOrderTicket = new Date();
      this.orderServiceService.createOrder(this.order).subscribe(next => {
        for (let i = 0; i < this.chairs.length; i++) {
          for (let j = 0; j < this.chairListChoise.length; j++) {
            if (this.chairs[i].idChair == this.chairListChoise[j]) {
              this.orderDetail.order = this.order;
              this.orderDetail.chair = this.chairs[i];
              this.orderDetail.priceChair = this.time.showTime.priceTime + this.chairs[i].priceChairType;
              this.orderDetailServiceService.createOrderDetail(this.orderDetail).subscribe();
            }
          }
        }
      });
      window.alert("Bạn đã Đặt Vé Thành Công. Thông tin chi tiết như sau");
      this.router.navigate(['/userOrderTicket', this.time.idTime,this.user.idUser, JSON.stringify(this.chairListChoise)])
    }
  }
}
