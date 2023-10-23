import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GymLocationFilter } from '../helpers/gym-location-filter';
import { GymLocations, Location } from '../types/gym-locations.interface';

@Injectable({
	providedIn: 'root',
})
export class GymService {
	private url =
		'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

	private gymLocationsBehaviorSubject: BehaviorSubject<GymLocations> =
		new BehaviorSubject<GymLocations>({ current_country_id: 0, locations: [] });
	private gymLocations$: Observable<GymLocations> =
		this.gymLocationsBehaviorSubject;
	private gymLocationsFilter: Location[] = [];
	private unitsFound: number = 0;

	constructor(private httpClient: HttpClient) {
		this.httpClient.get<GymLocations>(this.url).subscribe((data) => {
			const dataFormatted = GymLocationFilter.addFormattedFilter(data);
			this.gymLocationsBehaviorSubject.next(dataFormatted);
			this.gymLocationsFilter = dataFormatted.locations;
			this.unitsFound = dataFormatted.locations.length ?? 0;
		});
	}

	getAllGym(): Observable<GymLocations> {
		return this.gymLocations$;
	}

	getGymLocationFilter() {
		return this.gymLocationsFilter;
	}

	setGymLocationFilter(locations: Location[]) {
		this.gymLocationsFilter = locations;
	}
}
