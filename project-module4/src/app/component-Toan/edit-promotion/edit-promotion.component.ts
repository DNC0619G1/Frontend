import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/Model/promotion';
import { PromotionService } from 'src/app/service/promotion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.css']
})
export class EditPromotionComponent implements OnInit {

  promotion:Promotion = new Promotion();
  id: number;
  constructor(private promotionService: PromotionService, private router: Router, private route: ActivatedRoute) { }
  submitted = false;
  ngOnInit() {this.route.params.subscribe(params => {
    this.id = params['id'];
  })
  this.getPromotion(); 
  }

  getPromotion(){
    this.promotionService.getPromotion(this.id).subscribe(data => {
      this.promotion=data;
    })
  }
 
  createPromotion(){
    console.log(this.promotion)
    this.promotionService.getAddPromotion(this.promotion).subscribe(
      data =>this.router.navigate(['/listPromotion'])
      )}
  onSubmit() {
    this.submitted = true;
    this.createPromotion();    
  }
}
