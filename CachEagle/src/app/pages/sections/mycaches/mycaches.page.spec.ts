import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MycachesPage } from './mycaches.page';

describe('MycachesPage', () => {
  let component: MycachesPage;
  let fixture: ComponentFixture<MycachesPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(MycachesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
