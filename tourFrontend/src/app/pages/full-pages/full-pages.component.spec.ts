import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPagesComponent } from './full-pages.component';

describe('FullPagesComponent', () => {
  let component: FullPagesComponent;
  let fixture: ComponentFixture<FullPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
