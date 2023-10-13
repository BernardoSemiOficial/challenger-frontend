import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTitleComponent } from './content-title.component';

describe('ContentTitleComponent', () => {
  let component: ContentTitleComponent;
  let fixture: ComponentFixture<ContentTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentTitleComponent]
    });
    fixture = TestBed.createComponent(ContentTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
