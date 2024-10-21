import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarjuguetePage } from './agregarjuguete.page';

describe('AgregarjuguetePage', () => {
  let component: AgregarjuguetePage;
  let fixture: ComponentFixture<AgregarjuguetePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarjuguetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
