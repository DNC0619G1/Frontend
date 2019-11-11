import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Chair } from 'src/app/model/chair';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chair-detail',
  templateUrl: './chair-detail.component.html',
  styleUrls: ['./chair-detail.component.css']
})
export class ChairDetailComponent implements OnInit {
  idRoom: number;
  idChair: number;
  chair: Chair;
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute, private chairService: ChairServiceService) {
    this.titleService.setTitle("chi tiết ghế");
   }

  ngOnInit() {
    this.idRoom = this.route.snapshot.params['idRoom'];
    this.idChair = this.route.snapshot.params['chair.idChair'];
    this.chairService.getChairByID(this.idChair).subscribe(data => {
        this.chair = data;
      })
  }
  editChair(idChair: number) {
    this.router.navigate(['/editchair', idChair])
  }
  deleteChair(idChair: number) {
    this.chairService.deleteChair(this.chair.idChair).subscribe(data => {
      this.router.navigate(['/roomdetail', this.idRoom]);
    })
  }
}
