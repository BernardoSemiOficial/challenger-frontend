import { Component, Input, OnInit } from '@angular/core';
import { Location } from '~/app/types/gym-locations.interface';

@Component({
	selector: 'app-card-list',
	templateUrl: './card-list.component.html',
	styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
	@Input() gymLocationsFilter: Location[] = [];

	ngOnInit(): void {
		console.log('gymLocationsFilter', this.gymLocationsFilter);
	}
}
