import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, MinLengthValidator, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Options } from 'ng5-slider';

import { Validators } from '@angular/forms';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-filter-search-modal',
  templateUrl: './filter-search-modal.component.html',
  styleUrls: ['./filter-search-modal.component.css']
})
export class FilterSearchModalComponent implements OnInit
{
  closeResult: string;
  coffeeForm: FormGroup;
  price: number;
  MAXLEN: number = 500;
  MINLEN: number = 10;

  value: number = 5000;
  options: Options = {
    floor: 500,
    ceil: 20000,
    showTicks: true,
    stepsArray: [
      { value: 500, legend: '500m' },
      { value: 1000, legend: '1Km' },
      { value: 2000, legend: '2Km' },
      { value: 5000, legend: '5Km' },
      { value: 10000, legend: '10Km' },
      { value: 20000, legend: '20Km' }
    ]
  };

  constructor(
    private modalService: NgbModal,
    private coffeeShopsService: CoffeeshopsService,
    private fb: FormBuilder
  ) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-coffee-title', size: 'lg' }).result.then((result) => {
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

  ngOnInit() {
    this.coffeeForm = this.fb.group({
      "name": ['', [Validators.required, Validators.maxLength(100)]],
      "categories": ['', [Validators.required]],
      "description": ['', [Validators.required, Validators.minLength(this.MINLEN), Validators.maxLength(this.MAXLEN)]],
      "extras": ['', [Validators.maxLength(this.MAXLEN)]],
      "pricesm": ['', [Validators.min(0)]],
      "pricemd": ['', [Validators.min(0)]],
      "pricelg": ['', [Validators.min(0)]]
    });
  }
}
