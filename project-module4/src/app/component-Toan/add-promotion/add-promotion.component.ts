import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/Model/promotion';
import { PromotionService } from 'src/app/service/promotion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {
  promotion:Promotion = new Promotion();
  constructor(private promotionService: PromotionService, private router: Router) { }
  submitted = false;
  ngOnInit() {
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
