import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidretiroPage } from './validretiro.page';

describe('ValidretiroPage', () => {
  let component: ValidretiroPage;
  let fixture: ComponentFixture<ValidretiroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidretiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
