import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClintReportComponent } from './clint-report.component';

describe('ClintReportComponent', () => {
  let component: ClintReportComponent;
  let fixture: ComponentFixture<ClintReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClintReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClintReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
