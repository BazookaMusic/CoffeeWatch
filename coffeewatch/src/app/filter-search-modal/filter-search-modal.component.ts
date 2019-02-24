import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, MinLengthValidator, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Options } from 'ng5-slider';

import { Validators } from '@angular/forms';
import { CoffeeshopsService } from '../coffeeshops.service';
import { coffeeCategories } from '../coffee';
import { FilterObject, fix } from '../filters';


@Component({
  selector: 'app-filter-search-modal',
  templateUrl: './filter-search-modal.component.html',
  styleUrls: ['./filter-search-modal.component.css']
})
export class FilterSearchModalComponent implements OnInit {
  closeResult: string;
  filterForm: FormGroup;
  price: number;
  MAXLEN = 500;
  MINLEN = 10;
  checkboxArray: FormControl[];
  moreThan1: boolean;

  value = 5000;
  options: Options = {
    floor: 500,
    ceil: 20000,
    showTicks: true,
    stepsArray: [
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

  check(indexClicked: number) {
    this.checkboxArray.forEach((item, index) => {
      if (indexClicked !== index) {
        item.setValue('');
      }
      else
      {
        item.setValue(true);
      }
    });
  }

  checkMatch(AC: AbstractControl) {
    let found = false;
    for (let i = 0; i <= 8; i++) {
      found = found || AC.get('cat' + i).value !== false;
      if (found) { break; }
    }
    if (found) {
      return null;
    }
    else
    {
      return {noCategory: true};
    }
  }

  makeFilterObject() {
    const categories = coffeeCategories;
    const categoryIndex = this.checkboxArray.findIndex(fc => fc.value === true);
    const filters: FilterObject = {
      minPrice: fix(this.filterForm.controls.priceMin.value),
      maxPrice:  fix(this.filterForm.controls.priceMax.value, true),
      category: categoryIndex !== -1 ? coffeeCategories[categoryIndex] : '',
      minRating: fix(this.filterForm.controls.starsRating.value),
      sort: this.filterForm.controls.sortRadios.value,
      maxDist: this.value / 1000
    };
    return filters;
  }

  onFilterSubmit() {
    const filters: FilterObject = this.makeFilterObject();
    this.coffeeShopsService.setFilters(filters);
  }
  ngOnInit() {
    this.moreThan1 = false;
    this.value = 5000;

    this.checkboxArray = [
      new FormControl(true),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)];

    this.filterForm = this.fb.group({
      'cat0': this.checkboxArray[0],
      'cat1': this.checkboxArray[1],
      'cat2': this.checkboxArray[2],
      'cat3': this.checkboxArray[3],
      'cat4': this.checkboxArray[4],
      'cat5': this.checkboxArray[5],
      'cat6': this.checkboxArray[6],
      'cat7': this.checkboxArray[7],
      'cat8': this.checkboxArray[8],
      'sortRadios': ['price', Validators.required],
      'priceMin': ['', [Validators.min(0)]],
      'priceMax': ['', [Validators.min(0)]],
      'starsRating': ['', [Validators.min(0)]]
    }, {validator: this.checkMatch});
  }
}

