import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudjuegosPage } from './crudjuegos.page';

describe('CrudjuegosPage', () => {
  let component: CrudjuegosPage;
  let fixture: ComponentFixture<CrudjuegosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudjuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
