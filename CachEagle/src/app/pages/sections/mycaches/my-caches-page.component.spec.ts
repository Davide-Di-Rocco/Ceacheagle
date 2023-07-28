import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCachesPage } from './my-caches-page.component';

describe('MycachesPage', () => {
  let component: MyCachesPage;
  let fixture: ComponentFixture<MyCachesPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(MyCachesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
