import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignformsComponent } from './assignforms.component';

describe('AssignformsComponent', () => {
  let component: AssignformsComponent;
  let fixture: ComponentFixture<AssignformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignformsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
