import { Component, Input, OnInit } from '@angular/core';
import { Location } from '~/app/types/gym-locations.interface';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
	@Input() card!: Location;

	ngOnInit(): void {
		console.log('card', this.card);
	}
}
