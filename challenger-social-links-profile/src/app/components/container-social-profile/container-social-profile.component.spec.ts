import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSocialProfileComponent } from './container-social-profile.component';

describe('ContainerSocialProfileComponent', () => {
  let component: ContainerSocialProfileComponent;
  let fixture: ComponentFixture<ContainerSocialProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerSocialProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerSocialProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
