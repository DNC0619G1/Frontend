import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../service/promotion.service';
import { Promotion } from '../../model/promotion';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class ListPromotionComponent implements OnInit {
  promotions: Promotion[] = [];
  keyword: any;
  id: number;
  constructor(private promotionService: PromotionService,private titleService: Title) {
    this.titleService.setTitle("Danh Sách Khuyến Mãi");
   }

  ngOnInit() {
    this.promotionService.getAllPromotions().subscribe((data: Promotion[]) => {
      data.forEach(element => {
        this.promotions.push(element);
      });
    });
  }
  Search(keyword) {
    this.promotions = [];
    if(keyword == null){
      this.promotionService.getAllPromotions().subscribe((data: Promotion[]) => {
        data.forEach(element => {
          this.promotions.push(element);
        });
      });
    } else {
    this.promotionService.searchPromotion(keyword).subscribe((data: Promotion[]) => {
      data.forEach(element => {
        this.promotions.push(element);
      })
    })
  }
    this.keyword = null;
  }

  delete(id){
    console.log(id)
    this.id = id;
  }

  confirm(){
    this.promotionService.deletePromotion(this.id).subscribe();
    window.location.reload();
  }
}
