import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudjuguetesPage } from './crudjuguetes.page';

describe('CrudjuguetesPage', () => {
  let component: CrudjuguetesPage;
  let fixture: ComponentFixture<CrudjuguetesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudjuguetesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
