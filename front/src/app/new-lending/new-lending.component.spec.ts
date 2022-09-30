import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLendingComponent } from './new-lending.component';

describe('NewLendingComponent', () => {
  let component: NewLendingComponent;
  let fixture: ComponentFixture<NewLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
