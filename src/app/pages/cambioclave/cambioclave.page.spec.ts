import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioclavePage } from './cambioclave.page';

describe('CambioclavePage', () => {
  let component: CambioclavePage;
  let fixture: ComponentFixture<CambioclavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioclavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
