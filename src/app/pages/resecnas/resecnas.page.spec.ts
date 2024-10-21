import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResecnasPage } from './resecnas.page';

describe('ResecnasPage', () => {
  let component: ResecnasPage;
  let fixture: ComponentFixture<ResecnasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResecnasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
