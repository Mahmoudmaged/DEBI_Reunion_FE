import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomelessComponent } from './add-homeless.component';

describe('AddHomelessComponent', () => {
  let component: AddHomelessComponent;
  let fixture: ComponentFixture<AddHomelessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHomelessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomelessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
