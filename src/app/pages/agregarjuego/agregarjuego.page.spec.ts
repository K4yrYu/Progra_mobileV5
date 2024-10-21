import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarjuegoPage } from './agregarjuego.page';

describe('AgregarjuegoPage', () => {
  let component: AgregarjuegoPage;
  let fixture: ComponentFixture<AgregarjuegoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarjuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
