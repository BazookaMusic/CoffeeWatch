import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, MinLengthValidator } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Validators } from '@angular/forms';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-new-price-modal',
  templateUrl: './new-price-modal.component.html',
  styleUrls: ['./new-price-modal.component.css']
})

export class NewPriceModalComponent implements OnInit {
  closeResult: string;
  priceForm:FormGroup;
  price:number;
  constructor(
    private modalService: NgbModal,
    private coffeeShopsService:CoffeeshopsService
  ) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onPriceSubmit()
  {
    let price=this.priceForm.controls.price;
  }

  ngOnInit() 
  {
    this.priceForm = new FormGroup({
      price: new FormControl('',[Validators.required,Validators.min(0)])
    });
    var curprice=0;

    var curid= 0;
    this.coffeeShopsService.getSelectedCoffee().subscribe(id=>curid=id);
    this.coffeeShopsService.getCoffee(curid).subscribe(x => this.priceForm.controls.price.setValue(x.price));
  }
}
