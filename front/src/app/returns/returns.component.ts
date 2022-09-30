import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookLending } from '../models/book-lending';
import { LendingService } from '../services/lendings.service';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {
  returnForm: FormGroup;
  lendingsNotReturned: BookLending[] = [];
  constructor(private fb: FormBuilder, private lendingService: LendingService, private router: Router) {
    this.returnForm = this.fb.group({
      lendingId: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    this.lendingService.listNotReturned().subscribe({
      next: lendings => this.lendingsNotReturned = lendings,
      error: () => alert('Ocurrió un error')
    })
  }

  returnBook() {
    const {lendingId} = this.returnForm.value;
    const bookLending = this.lendingsNotReturned.find(lend => lend.lendingId == lendingId);
    if(bookLending == null) {
      return;
    }
    const lendingToSend = {
      id: lendingId,
      userId: bookLending.userId,
      bookId: bookLending.bookId,
      dateOut: bookLending.dateOut,
      dateReturn: new Date().toISOString()
    };


    this.lendingService.update(lendingToSend).subscribe({
      next: () => {
        this.router.navigate(['prestamos']);
      },
      error: () => {
        alert('Ocurrió un error.')
      }
    });
  }

}
