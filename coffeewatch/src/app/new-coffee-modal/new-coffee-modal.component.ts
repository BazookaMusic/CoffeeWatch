import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, MinLengthValidator, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Validators } from '@angular/forms';
import { CoffeeshopsService } from '../coffeeshops.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { coffeeCategories, Coffee, APICoffee } from '../coffee';
import { CoffeeShop } from '../coffee-shop';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-coffee-modal',
  templateUrl: './new-coffee-modal.component.html',
  styleUrls: ['./new-coffee-modal.component.css']
})

export class NewCoffeeModalComponent implements OnInit {
  closeResult: string;
  coffeeForm: FormGroup;
  price: number;

  @Input() coffeeShop: CoffeeShop;
  MAXLEN = 1000;
  MINLEN = 50;

  coffeeCat = coffeeCategories;

  constructor(
    private modalService: NgbModal,
    private coffeeShopsService: CoffeeshopsService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  open(content) {
    if (this.userService.isloggedIN()) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-coffee-title', size: 'lg' }).result.then((result) => {
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

  private onCoffeeSubmit()
  {
    const form = this.coffeeForm.controls;
    const coffee: APICoffee = {id: undefined, name: form.name.value,
      category: form.categories.value, withdrawn: false, shopid: this.coffeeShop.id,
      description: form.description.value, price: form.price.value, tags: [],
      extraData: {rating: 0, numOfReviews: 0}};
    this.coffeeShopsService.submitCoffee(coffee, this.coffeeShop.id, this.coffeeShop.name).pipe(catchError(err =>
      {
        alert(err);
        return of(undefined);
      })).subscribe(price => console.log(price));
  }

  ngOnInit() {
    console.log(this.coffeeShop);
   this.coffeeForm = this.fb.group({
     'name': ['', [Validators.required, Validators.maxLength(100)]],
     'categories': ['', [Validators.required]],
     'description': ['', [Validators.required, Validators.minLength(this.MINLEN), Validators.maxLength(this.MAXLEN)]],
     'price': ['', [Validators.min(0)]]
   });
  }
}
