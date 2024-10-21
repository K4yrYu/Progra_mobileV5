import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuguetesPage } from './juguetes.page';

describe('JuguetesPage', () => {
  let component: JuguetesPage;
  let fixture: ComponentFixture<JuguetesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JuguetesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
