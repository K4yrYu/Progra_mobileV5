import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarconsolaPage } from './agregarconsola.page';

describe('AgregarconsolaPage', () => {
  let component: AgregarconsolaPage;
  let fixture: ComponentFixture<AgregarconsolaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarconsolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
