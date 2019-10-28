import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/Model/promotion';
import { PromotionService } from 'src/app/service/promotion.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {
  promotion:Promotion = new Promotion();
  constructor(private titleService: Title,private promotionService: PromotionService, private router: Router) {
    this.titleService.setTitle("Thêm Khuyến Mãi");
   }
  submitted = false;
  ngOnInit() {
  }
 
  createPromotion(){
    this.promotionService.getAddPromotion(this.promotion).subscribe(
      data => this.router.navigate(['/listPromotion'])
      )}
  onSubmit() {
    this.submitted = true;
    this.createPromotion();    
  }
}
