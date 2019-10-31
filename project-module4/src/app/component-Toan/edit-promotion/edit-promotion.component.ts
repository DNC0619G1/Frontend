import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/Model/promotion';
import { PromotionService } from 'src/app/service/promotion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.css']
})
export class EditPromotionComponent implements OnInit {
  promotionFormGroup: FormGroup;
  submitted = false;
  id: number;
  promotion: Promotion = new Promotion();
  show: boolean;

  constructor(private formBuilder: FormBuilder, private promotionService: PromotionService, private router: Router, private titleService: Title,private route: ActivatedRoute){
    this.titleService.setTitle("Thay đổi Khuyến Mãi");
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
    )
  }

  onSubmit() {
    this.submitted = true;
   if(this.promotionFormGroup.value.endDate > this.promotionFormGroup.value.startDate){
    this.createPromotion();    
   }else{
     this.show = true;
   } 
  }

  ngOnInit(){this.route.params.subscribe(params => {
    this.id = params['id'];
  })
  this.getPromotion(); 
  }

  getPromotion(){
    this.promotionService.getPromotion(this.id).subscribe(data => {
      this.promotion=data,
      this.promotionFormGroup.patchValue(data)
    })
  }

  confirm(){
    this.router.navigate(['/listPromotion'])
  }

  // promotion:Promotion = new Promotion();
  // id: number;
  // constructor(private titleService: Title,private promotionService: PromotionService, private router: Router, private route: ActivatedRoute) {
  //   this.titleService.setTitle("Chỉnh Sửa Thông Tin Khuyến Mãi");
  //  }
  // submitted = false;
  // ngOnInit() {this.route.params.subscribe(params => {
  //   this.id = params['id'];
  // })
  // this.getPromotion(); 
  // }

  // getPromotion(){
  //   this.promotionService.getPromotion(this.id).subscribe(data => {
  //     this.promotion=data;
  //   })
  // }
 
  // createPromotion(){
  //   console.log(this.promotion)
  //   this.promotionService.getAddPromotion(this.promotion).subscribe(
  //     data =>this.router.navigate(['/listPromotion'])
  //     )}
  // onSubmit() {
  //   this.submitted = true;
  //   this.createPromotion();    
  // }
}
