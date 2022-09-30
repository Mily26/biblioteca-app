import { Component, OnInit } from '@angular/core';
import { BookLending } from '../models/book-lending';
import { Lending } from '../models/lending';
import { LendingService } from '../services/lendings.service';

@Component({
  selector: 'app-lendings',
  templateUrl: './lendings.component.html',
  styleUrls: ['./lendings.component.css']
})
export class LendingsComponent implements OnInit {
  lendingList: BookLending[] = [];
  empty = true;
  constructor(private lendingService: LendingService) { }

  ngOnInit(): void {
    this.lendingService.list()
      .subscribe(lendings => {
        this.lendingList = lendings;
        this.empty = this.lendingList.length == 0;
      });
  }

}
