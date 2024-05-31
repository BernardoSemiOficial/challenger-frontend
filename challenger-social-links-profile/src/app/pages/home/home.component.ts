import { Component } from '@angular/core';
import { ContainerSocialProfileComponent } from '../../components/container-social-profile/container-social-profile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContainerSocialProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
