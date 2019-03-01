import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, MinLengthValidator, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Validators } from '@angular/forms';
import { CoffeeshopsService } from '../coffeeshops.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { coffeeCategories } from '../coffee';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-coffee',
  templateUrl: './edit-coffee.component.html',
  styleUrls: ['./edit-coffee.component.css']
})
export class EditCoffeeComponent implements OnInit
{
  closeResult: string;
  coffeeForm: FormGroup;
  price: number;
  MAXLEN = 500;
  MINLEN = 10;

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

  ngOnInit() {
    this.coffeeForm = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(100)]],
      'categories': ['', [Validators.required]],
      'description': ['', [Validators.required, Validators.minLength(this.MINLEN), Validators.maxLength(this.MAXLEN)]],
      'extras': ['', [Validators.maxLength(this.MAXLEN)]],
      'price': ['', [Validators.min(0)]]
    });

    this.coffeeShopsService.getSelectedCoffee().pipe(flatMap(id => this.coffeeShopsService.getCoffee(id))).subscribe(coffee => {
      if (coffee !== undefined) 
      {
        this.coffeeForm.controls.name.setValue(coffee.name);
        this.coffeeForm.controls.categories.setValue(coffee.category);
        this.coffeeForm.controls.price.setValue(coffee.price);
        this.coffeeForm.controls.description.setValue(coffee.description);
        this.coffeeForm.controls.extras.setValue(coffee.extraData);
      }
    });
  }
}
