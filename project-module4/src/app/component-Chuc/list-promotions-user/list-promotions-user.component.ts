import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/service/promotion.service';
import { Title } from '@angular/platform-browser';
import { Promotion } from 'src/app/Model/promotion';

@Component({
  selector: 'app-list-promotions-user',
  templateUrl: './list-promotions-user.component.html',
  styleUrls: ['./list-promotions-user.component.css']
})
export class ListPromotionsUserComponent implements OnInit {
  promotions: Promotion[] = [];
  today: Date = new Date();
  count: number = 0;
  constructor(private promotionService: PromotionService, private titleService: Title) {
    this.titleService.setTitle("Danh Sách Khuyến Mãi");
  }

  ngOnInit() {
    this.promotionService.getAllPromotionsAfterEndDate().subscribe((data: Promotion[]) => {
        this.promotions=data;
    });
    console.log(this.promotions);
  }
  isEndDate(end: Date, today: Date): boolean {
    return end >= today;
  }
}
