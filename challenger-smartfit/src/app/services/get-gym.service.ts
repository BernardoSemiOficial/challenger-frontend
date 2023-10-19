import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GymLocations } from '../types/gym-locations.interface';

@Injectable({
	providedIn: 'root',
})
export class GetGymService {
	private url =
		'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

	constructor(private httpClient: HttpClient) {}

	getGym(): Observable<GymLocations> {
		return this.httpClient.get<GymLocations>(this.url);
	}
}
