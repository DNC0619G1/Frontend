import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/Model/promotion';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from 'src/app/service/promotion.service';

@Component({
  selector: 'app-delete-promotion',
  templateUrl: './delete-promotion.component.html',
  styleUrls: ['./delete-promotion.component.css']
})
export class DeletePromotionComponent implements OnInit {
promotion: Promotion;
id: number;
  constructor(private promotionService: PromotionService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getPromotion(); 
  }

  getPromotion(){
    this.promotionService.getPromotion(this.id).subscribe(data => {
      this.promotion=data;
    })
  }

  Confirm(){
    this.promotionService.deletePromotion(this.id).subscribe(
      next => {
        this.router.navigate(['/listPromotion']);
      });
  }
}
