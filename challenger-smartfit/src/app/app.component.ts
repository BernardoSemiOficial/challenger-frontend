import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GymService } from './services/gym.service';
import { Location } from './types/gym-locations.interface';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	isViewCardList = new BehaviorSubject(false);
	gymLocationsFilter: Location[] = [];

	constructor(private gymService: GymService) {}

	formOnSubmit() {
		console.log('formOnSubmit');
		this.isViewCardList.next(true);
		this.gymLocationsFilter = this.gymService.getGymLocationFilter();
	}
}
