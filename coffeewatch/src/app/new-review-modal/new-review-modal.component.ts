import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Review } from '../review';
import { Coffee } from '../coffee';
import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-new-review-modal',
  templateUrl: './new-review-modal.component.html',
  styleUrls: ['./new-review-modal.component.css']
})

export class NewReviewModalComponent implements OnInit {
  review: Review;
  closeResult: string;
  reviewForm: FormGroup;
  MAXLEN = 500;
  MINLEN = 10;
  selectedId: number;

  constructor(private modalService: NgbModal,
    private userService: UserService,
    private router: Router,
    private coffeeShopsService: CoffeeshopsService) { }

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

  onReviewSubmit() {
    const formRev = this.reviewForm.controls.review;
    const formStars = this.reviewForm.controls.starsRating;
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDay();
    this.review = new Review(undefined, this.selectedId, formRev.value as string,
       formStars.value as number,
       this.userService.currentUserID , this.userService.currentUsername ,
       d + '-' + m + '-' + y,
        0, 0);
    console.log(this.review);
    this.coffeeShopsService.submitReview(this.review).subscribe(review =>
      {
        if (review !== undefined)
        {
          this.coffeeShopsService.reviewsNeedRefresh(this.selectedId);
        }
      }
      );
  }


  resetForm() {
    this.reviewForm.controls.review.setValue('');
    this.reviewForm.controls.starsRating.setValue('0');
  }
  askDismiss() {
    if (this.reviewForm.controls.review.value.length > 0) {
      if (confirm('Δεν έχετε δημοσιεύσει την αξιολόγηση σας. Πατήστε ΟΚ για να την απορρίψετε')) {
        this.resetForm();
        this.modalService.dismissAll('cross clicked');
      }
    }
  }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      review: new FormControl('', [Validators.minLength(this.MINLEN), Validators.maxLength(this.MAXLEN)]),
      starsRating: new FormControl('')
    });

    this.coffeeShopsService.getSelectedCoffee().subscribe(id => this.selectedId = id);
  }
}
