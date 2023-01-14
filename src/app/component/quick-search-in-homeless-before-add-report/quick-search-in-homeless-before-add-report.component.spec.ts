import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSearchInReportComponent } from './quick-search-in-homeless-before-add-report.component';

describe('QuickSearchInReportComponent', () => {
  let component: QuickSearchInReportComponent;
  let fixture: ComponentFixture<QuickSearchInReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickSearchInReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSearchInReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
