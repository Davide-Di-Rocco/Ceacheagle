import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CacheDetailWithHintsPage } from './cache-detail-with-hints.page';

describe('CacheDetailWithHintsPage', () => {
  let component: CacheDetailWithHintsPage;
  let fixture: ComponentFixture<CacheDetailWithHintsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CacheDetailWithHintsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
