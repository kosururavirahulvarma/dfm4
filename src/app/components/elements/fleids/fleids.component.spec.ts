import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleidsComponent } from './fleids.component';

describe('FleidsComponent', () => {
  let component: FleidsComponent;
  let fixture: ComponentFixture<FleidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleidsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
