import { Component, OnInit } from '@angular/core';
import { Chair } from 'src/app/model/chair';
import { ChairServiceService } from 'src/app/service/chair-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowTime } from 'src/app/model/ShowTimes';
import { ShowTimesService } from 'src/app/service/show-times.service';

@Component({
  selector: 'app-list-chair',
  templateUrl: './list-chair.component.html',
  styleUrls: ['./list-chair.component.css']
})
export class ListChairComponent implements OnInit {
  chairs: Chair[] = [];//danh sach ghe 
  rows: number[] = [];
  columns: number[] = [];
  maxColumn: number = 0;
  maxRow: number = 0;
  showTimes:ShowTime[];//danh sach lich chieu
  time: ShowTime;//lich chieu dc chon
  id: number;
  chairListChoise: number[]=[];//danh sach ghe chon
  amountChairChoise: number;
  constructor(private chairService: ChairServiceService,private router :Router, private route: ActivatedRoute, private showTimesService: ShowTimesService,) { }

  ngOnInit() {
    this.chairService.getchairs()
      .subscribe((data: Chair[]) => {
        data.forEach(element => {
          this.chairs.push(element)
        })
        for (let i = 0; i < this.chairs.length; i++) {
          if (this.chairs[i].row > this.maxRow) {
            this.maxRow = this.chairs[i].row;
          }
          if (this.chairs[i].column > this.maxColumn) {
            this.maxColumn = this.chairs[i].column;
          }
        }

        for (let i = 0; i < this.chairs.length; i++) {
          if (this.chairs[i].column == this.maxColumn) {
            this.rows.push(this.chairs[i].row);
          }
          if (this.chairs[i].row == this.maxRow) {
            this.columns.push(this.chairs[i].column);
          }
        }
      });

      this.time=new ShowTime();
      this.id = this.route.snapshot.params['showtime.idTime'];
      this.showTimesService.getShowTimeById(this.id)
      .subscribe(data => {
        this.time = data;
      })
  }

  changeStatus(row: number, col: number) {
    // console.log(this.chairListChoise.length)
    for (let i = 0; i < this.chairs.length; i++) {
      if ((this.chairs[i].column == col) && (this.chairs[i].row == row)) {
        this.chairs[i].choiseStatus = !this.chairs[i].choiseStatus;
        if(this.chairs[i].choiseStatus==true){
          if(this.chairListChoise.length==this.amountChairChoise){//so sanh da du ghe da chon chua
            this.chairs[this.chairListChoise[0]-1].choiseStatus = false;//doi mau ghe chon som nhat de xoa
            this.chairListChoise.splice(0,1);//xoa pt dau tien khi da du so ghe.
          }
          this.chairListChoise.push(this.chairs[i].idChair)//them vao ghe da chon vao cuoi danh sach
        }else{
          for(let j=0;j<this.chairListChoise.length;j++){
            if(this.chairs[i].idChair==this.chairListChoise[j]){
              this.chairListChoise.splice(j,1);//xoa pt khi click lai
            }
          }
        }
      }
    }
  }
  chairChanged(idchair : number){
    this.amountChairChoise=idchair;
    if(this.amountChairChoise<this.chairListChoise.length){//neu ng dung thay doi so ghe it hon lua chon ban dau
      for(let i=0;i<this.chairListChoise.length;i++){//bo het cac ghe da chon
        this.chairs[this.chairListChoise[i]-1].choiseStatus = false//chi so ghe ba dau tu 1 mang bat dau tu 0 nen -1
      }
      this.chairListChoise.length=0;//sau khi xoa ghe da chon cho do dai da chon ve 0 de push lai gia tri
    }
  }
  checkChair(selectChar: number){
    let isNext:boolean=false;
    if(selectChar>this.chairListChoise.length){
      window.alert("Ban chọn chưa đủ ghế ")
    }
    else {
      this.router.navigate(['/xacnhanbanve',this.time.idTime, JSON.stringify(this.chairListChoise)])
    }
  }
}
