import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Chair } from 'src/app/model/chair';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-chair',
  templateUrl: './edit-chair.component.html',
  styleUrls: ['./edit-chair.component.css']
})
export class EditChairComponent implements OnInit {
  idRoom: number;
  idChair: number;
  chair: Chair = new Chair();
  constructor(private titleService: Title,private router: Router, private route: ActivatedRoute, private chairService: ChairServiceService) {
    this.titleService.setTitle("sửa ghế")
   }

  ngOnInit() {
    this.idChair = this.route.snapshot.params['chair.idChair'];
    this.chairService.getChairByID(this.idChair).subscribe(data => {
        this.chair = data;
        this.idRoom = this.chair.room.idRoom;
      })
  }
  changDetail(changedetail: number) {
    this.chair.idChairDetail =changedetail;
  }
  updateChair() {
    this.chairService.createChair(this.chair).subscribe(data => this.router.navigate(['/chairdetail',this.idRoom,this.chair.idChair]), error => console.log(error));
  }
}
