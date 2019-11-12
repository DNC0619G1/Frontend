import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from 'src/app/service/promotion.service';
import { Promotion } from 'src/app/Model/promotion';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {
  idPromotion:number;
  promotion :Promotion;
  constructor(private titleService: Title,private router: Router, private route: ActivatedRoute, private promotionService: PromotionService) { 
    this.titleService.setTitle("Chi tiết khuyến mãi")
  }

  ngOnInit() {
    this.idPromotion = this.route.snapshot.params['idPromotion'];
    console.log(this.idPromotion)
    this.promotionService.getPromotion(this.idPromotion).subscribe(data => {
        this.promotion = data;
      })
  }

}
