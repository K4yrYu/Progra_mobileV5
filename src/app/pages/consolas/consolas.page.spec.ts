import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsolasPage } from './consolas.page';

describe('ConsolasPage', () => {
  let component: ConsolasPage;
  let fixture: ComponentFixture<ConsolasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
