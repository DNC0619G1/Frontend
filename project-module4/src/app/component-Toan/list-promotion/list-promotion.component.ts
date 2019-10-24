import { Component, OnInit } from '@angular/core';
import { PromotionService} from '../../service/promotion.service';
import { Promotion } from '../../model/promotion';
@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class ListPromotionComponent implements OnInit {
promotions: Promotion[] =[];
  constructor(private promotionService: PromotionService) { }

  ngOnInit() {
    this.promotionService.getAllPromotions().subscribe((data: Promotion[]) => {
      data.forEach(element => {
        this.promotions.push(element);
      });
    });
  }

}
