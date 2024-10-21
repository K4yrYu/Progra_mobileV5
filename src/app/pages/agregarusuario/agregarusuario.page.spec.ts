import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarusuarioPage } from './agregarusuario.page';

describe('AgregarusuarioPage', () => {
  let component: AgregarusuarioPage;
  let fixture: ComponentFixture<AgregarusuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
