import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Chair } from 'src/app/model/chair';

@Component({
  selector: 'app-edit-chair',
  templateUrl: './edit-chair.component.html',
  styleUrls: ['./edit-chair.component.css']
})
export class EditChairComponent implements OnInit {
  idRoom: number;
  idChair: number;
  chair: Chair = new Chair();
  constructor(private router: Router, private route: ActivatedRoute, private chairService: ChairServiceService) { }

  ngOnInit() {
    this.idChair = this.route.snapshot.params['chair.idChair'];
    this.chairService.getChairByID(this.idChair)
      .subscribe(data => {
        this.chair = data;
        this.idRoom = this.chair.idRoom;
        console.log(this.chair)
      })
  }
  changDetail(changedetail: number) {
    this.chair.idChairDetail =changedetail;

    console.log(this.chair.idChairDetail)
  }
  updateChair() {
    this.chairService.createChair(this.chair)
      .subscribe(data => this.router.navigate(['/chairdetail',this.idRoom,this.chair.idChair]), error => console.log(error));
  }
}
