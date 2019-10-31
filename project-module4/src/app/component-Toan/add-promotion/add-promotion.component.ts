import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/Model/promotion';
import { PromotionService } from 'src/app/service/promotion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {
  promotionFormGroup: FormGroup;
  submitted = false;
  show: boolean;

  constructor(private formBuilder: FormBuilder, private promotionService: PromotionService, private router: Router, private titleService: Title){
    this.titleService.setTitle("Thêm Khuyến Mãi");
    this.createForm();
  }

  createForm(){
    this.promotionFormGroup = this.formBuilder.group({
      imgPromotion: ['', Validators.required],
      titlePromotion: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      saleOff: ['', Validators.required],
      detailPromotion: ['', Validators.required]
    })

  }
  createPromotion(){
    this.promotionService.getAddPromotion(this.promotionFormGroup.value).subscribe(
      data => this.router.navigate(['/listPromotion'])
    )}
  onSubmit() {
    this.submitted = true;
   if(this.promotionFormGroup.value.endDate > this.promotionFormGroup.value.startDate){
    this.createPromotion();    
   }else{
     this.show = true;
   } 
  }

// confirm(){
//   this.router.navigate(['/listPromotion'])
// }
  ngOnInit(){}

  

  // promotion:Promotion = new Promotion();
  // constructor(private titleService: Title,private promotionService: PromotionService, private router: Router) {
  //   this.titleService.setTitle("Thêm Khuyến Mãi");
  //  }
  // submitted = false;
  // ngOnInit() {
  // }
 
  // createPromotion(){
  //   this.promotionService.getAddPromotion(this.promotion).subscribe(
  //     data => this.router.navigate(['/listPromotion'])
  //     )}
  // onSubmit() {
  //   this.submitted = true;
  //   this.createPromotion();    
  // }
}
