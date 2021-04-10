import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWithContentComponent } from './main-with-content.component';

describe('MainWithContentComponent', () => {
  let component: MainWithContentComponent;
  let fixture: ComponentFixture<MainWithContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainWithContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainWithContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
