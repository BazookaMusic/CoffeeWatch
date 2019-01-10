import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Review } from '../review';
import { Coffee } from '../coffee';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-new-review-modal',
  templateUrl: './new-review-modal.component.html',
  styleUrls: ['./new-review-modal.component.css']
})

export class NewReviewModalComponent implements OnInit
{
  review:Review;
  closeResult: string;
  reviewForm:FormGroup;
  MAXLEN:number=150;
  MINLEN:number=10;


  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string
  {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onReviewSubmit()
  {
    let formRev=this.reviewForm.controls.review; 
    let formStars=this.reviewForm.controls.starsRating; 
    this.review=new Review(-1,formRev.value as string,formStars.value as number,undefined,undefined,new Date(),0,0);
    this.reviewSubmit(this.review);

  }


  reviewSubmit(rev:Review)
  {}

  resetForm()
  {
    this.reviewForm.controls.review.setValue('');
    this.reviewForm.controls.starsRating.setValue('0'); 
  }
  askDismiss()
  {
    if (this.reviewForm.controls.review.value.length>0)
    {
      if (confirm("Δεν έχετε δημοσιεύσει την αξιολόγηση σας. Πατήστε ΟΚ για να την απορρίψετε"))
      {
        this.resetForm();
        this.modalService.dismissAll("cross clicked");
      }
    }
  }

  ngOnInit()
  {
    this.reviewForm = new FormGroup({
      review: new FormControl('',[Validators.minLength(this.MINLEN),Validators.maxLength(this.MAXLEN)]),
      starsRating: new FormControl('') 
    });

  }
}
