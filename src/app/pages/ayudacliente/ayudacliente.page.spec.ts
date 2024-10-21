import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudaclientePage } from './ayudacliente.page';

describe('AyudaclientePage', () => {
  let component: AyudaclientePage;
  let fixture: ComponentFixture<AyudaclientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
