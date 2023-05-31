import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CacheDetailWithStatsPage } from './cache-detail-with-stats.page';

describe('CacheDetailWithStatsPage', () => {
  let component: CacheDetailWithStatsPage;
  let fixture: ComponentFixture<CacheDetailWithStatsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CacheDetailWithStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
