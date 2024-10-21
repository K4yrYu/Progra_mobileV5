import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudconsolasPage } from './crudconsolas.page';

describe('CrudconsolasPage', () => {
  let component: CrudconsolasPage;
  let fixture: ComponentFixture<CrudconsolasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudconsolasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
