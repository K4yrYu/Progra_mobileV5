import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudusuariosPage } from './crudusuarios.page';

describe('CrudusuariosPage', () => {
  let component: CrudusuariosPage;
  let fixture: ComponentFixture<CrudusuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
