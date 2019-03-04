import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, MinLengthValidator } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Validators } from '@angular/forms';
import { CoffeeshopsService } from '../coffeeshops.service';
import { flatMap, catchError } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { priceData } from '../price';
import { Coffee } from '../coffee';
import { CoffeeShop } from '../coffee-shop';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-price-modal',
  templateUrl: './new-price-modal.component.html',
  styleUrls: ['./new-price-modal.component.css']
})

export class NewPriceModalComponent implements OnInit {
  closeResult: string;
  priceForm: FormGroup;
  price: number;
  loggedIn: boolean;

  @Input() coffee: Coffee;
  @Input() coffeeShop: CoffeeShop;
  


  constructor(
    private modalService: NgbModal,
    private coffeeShopsService: CoffeeshopsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  open(content) {
    if (this.userService.isloggedIN()) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.router.navigate(['/login']);
    }
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

  onPriceSubmit() {
    const price: number = this.priceForm.controls.price.value;
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2,'0');
    const day = date.getDate().toString().padStart(2,'0');


    const newPrice: priceData = {
     price: price,
     date: `${year}-${month}-${day}`,
     shopId: this.coffeeShop.id,
     productId: this.coffee.id,
     productName: this.coffee.name, shopName: this.coffeeShop.name};

     console.log(newPrice);

    this.coffeeShopsService.submitPrice(newPrice).pipe(catchError(err => {
        alert(err.message);
        return of(undefined);
      })).subscribe(new_price => {
          if (new_price !== undefined) {
            this.coffeeShopsService.priceNeedsRefresh();
            this.modalService.dismissAll('price updated');
          }
        });


  }

  ngOnInit() {
    this.priceForm = new FormGroup({
      price: new FormControl('', [Validators.required, Validators.min(0)])
    });


    this.coffeeShopsService.getSelectedCoffee().pipe(flatMap(id => this.coffeeShopsService.getCoffee(id))).subscribe(coffee => {
        if (coffee !== undefined) { this.priceForm.controls.price.setValue(coffee.price); }
      });
  }
}
