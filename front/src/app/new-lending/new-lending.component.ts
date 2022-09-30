import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Book } from '../models/book';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { LendingService } from '../services/lendings.service';

@Component({
  selector: 'app-new-lending',
  templateUrl: './new-lending.component.html',
  styleUrls: ['./new-lending.component.css']
})
export class NewLendingComponent implements OnInit {
  maxReturnDate = '';
  maxReturnDateIso = '';
  newLendingForm: FormGroup;
  books: Book[] = [];
  userId = 0;
  constructor(private fb: FormBuilder, private bookService: BookService, private lendingService: LendingService, 
    private authService: AuthService,
    private router: Router) {
    this.newLendingForm = this.fb.group({
      bookId: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.bookService.list().subscribe(books => this.books = books);
    this.authService.$user.pipe(take(1)).subscribe(user=> this.userId = +user.id);
    this.calculateMaxReturnDate();
    
  }

  calculateMaxReturnDate() {
    const nowInMilliseconds = new Date().getTime();
    const fifteenDays = 15 * 24 * 60 * 60 * 1000;
    const resultDate = new Date(nowInMilliseconds + fifteenDays);
    this.maxReturnDateIso = resultDate.toISOString();
    this.maxReturnDate = resultDate.getDate() + '/' + (resultDate.getMonth() + 1) + '/' + resultDate.getFullYear();
  }

  submit() {
    console.log(this.newLendingForm.value);
    const newLending = {
      id: 0,
      userId: this.userId, // todo change
      bookId: this.newLendingForm.value.bookId,
      dateOut: new Date().toISOString(),
      dateReturn: ''
    }

    console.log(newLending)

    this.lendingService.insert(newLending)
      .subscribe({
        next: () => {
          this.router.navigate(['prestamos']);
        },
        error: () => {
          alert("Ocurrió un error.");
        }
      })
  }

}
