import { Component, OnInit } from '@angular/core';
import { Chair } from 'src/app/model/chair';
import { ShowTime } from 'src/app/model/ShowTimes';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowTimesService } from 'src/app/service/show-times.service';
import { Title } from '@angular/platform-browser';
import { UsersService } from '../../service/users.service';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-order-chair',
  templateUrl: './order-chair.component.html',
  styleUrls: ['./order-chair.component.css']
})
export class OrderChairComponent implements OnInit {
  chairs: Chair[] = [];//danh sach ghe 
  user: User = new User();
  rowColumnMap: Map<number, number[]> = new Map<0, []>();
  showTimes: ShowTime[];//danh sach lich chieu
  time: ShowTime = new ShowTime();//lich chieu dc chon
  idShowTime: number;
  idUser: number;
  chairListChoise: number[] = [];//danh sach ghe chon
  amountChairChoise: number;
  constructor(private chairService: ChairServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private showTimesService: ShowTimesService,
    private titleService: Title,
    private usersService: UsersService
  ) {
    this.titleService.setTitle("Chọn Ghế");
  }
  ngOnInit() {
    this.time = new ShowTime();
    this.idShowTime = this.route.snapshot.params['showtime.idTime'];
    this.showTimesService.getShowTimeById(this.idShowTime).subscribe(data => {
      this.time = data;
    })
     this.idUser = +this.route.snapshot.params['user.idUser'];
    this.usersService.getUserByIdUser(this.idUser).subscribe(
      next => (this.user = next),
      error => {
        console.log(error);
        this.user = null;
      },
    );
    this.chairService.getchairs().subscribe((data: Chair[]) => {
      data.forEach(element => {
        if (this.time.room.idRoom == element.room.idRoom) {
          this.chairs.push(element);
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
    });
  }

  changeStatus(row: number, col: number) {
    for (let i = 0; i < this.chairs.length; i++) {
      if ((this.chairs[i].column == col) && (this.chairs[i].row == row)) {
        this.chairs[i].choiseStatus = !this.chairs[i].choiseStatus;
        if (this.chairs[i].choiseStatus == true) {
          if (this.chairListChoise.length == this.amountChairChoise) {//so sanh da du ghe da chon chua
            (this.chairs[this.chairListChoise[0]]).choiseStatus = false;//doi mau ghe chon som nhat de xoa
            this.chairListChoise.splice(0, 1);//xoa pt dau tien khi da du so ghe.
          }
          this.chairListChoise.push(i)//them chi so mang ghe da chon vao cuoi danh sach

        } else {
          for (let j = 0; j < this.chairListChoise.length; j++) {
            if (i == this.chairListChoise[j]) {
              this.chairListChoise.splice(j, 1);//xoa pt khi click lai
            }
          }
        }
      }
    }
  }
  chairChanged(idchair: number) {
    this.amountChairChoise = idchair;
    if (this.amountChairChoise != this.chairListChoise.length) {//neu ng dung thay doi so ghe it hon lua chon ban dau
      for (let i = 0; i < this.chairListChoise.length; i++) {//bo het cac ghe da chon
        this.chairs[this.chairListChoise[i]].choiseStatus = false//cho cac ghe da chon ve false
      }
      this.chairListChoise.length = 0;//sau khi xoa ghe da chon cho do dai da chon ve 0 de push lai gia tri
    }
  }
  checkChair(selectChar: number) {
    if (selectChar > this.chairListChoise.length) {
      window.alert("Ban chọn chưa đủ ghế ");
    }
    else {
      for (let j = 0; j < this.chairListChoise.length; j++) {
        this.chairListChoise[j] = this.chairs[this.chairListChoise[j]].idChair;//xoa pt khi click lai
      }
      this.router.navigate(['/verifyOrderTicket', this.time.idTime,this.user.idUser, JSON.stringify(this.chairListChoise)])
      console.log(this.user.idUser + " " + this.time.idTime, JSON.stringify(this.chairListChoise))
    }
  }
}

