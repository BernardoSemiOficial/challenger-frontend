import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { GymLocationFilter } from '~/app/helpers/gym-location-filter';
import { GymService } from '~/app/services/gym.service';
import { GymLocations, Location } from '~/app/types/gym-locations.interface';

interface GymFilter {
	period: FormControl<string | null>;
	isViewClosedUnits: FormControl<boolean | null>;
}

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
	@Output() formOnSubmit = new EventEmitter();

	gymFilter!: FormGroup<GymFilter>;
	gymLocations!: GymLocations;
	gymLocationsFilter!: Location[];
	unitsFound = this.gymLocations?.locations.length ?? 0;

	constructor(
		private formBuilder: FormBuilder,
		private gymService: GymService
	) {}

	/** MÉTODO QUE EXECUTA NA PRIMEIRA RENDERIZAÇÃO DO COMPONENTE */
	ngOnInit() {
		this.gymFilter = this.formBuilder.group<GymFilter>({
			period: new FormControl('', Validators.required),
			isViewClosedUnits: new FormControl(false, Validators.required),
		});
		this.gymService.getAllGym().subscribe((data) => {
			this.gymLocations = data;
			this.unitsFound = data.locations.length ?? 0;
			console.log(this.gymLocations);
		});
	}

	onSubmit() {
		// EXIBIR TODAS AS ACADEMIAS QUE SE ENCONTRAM ABERTAS EM FUNCIONAMENTO
		const period = this.gymFilter.value.period;
		if (!period) return;

		const isViewClosedUnits = Boolean(this.gymFilter.value.isViewClosedUnits);
		const gymOpenedUnitsLocations = this.gymLocations.locations.filter(
			(gymLocation) => gymLocation.opened
		);

		this.gymLocationsFilter = gymOpenedUnitsLocations.filter((location) => {
			const schedule = location.formattedFilter.currentOpeningHours;
			const { isGymOpenHourStart, isGymOpenHourEnd } =
				GymLocationFilter.gymAvailableTimes({
					hour: schedule.hour,
					period,
					isViewClosedUnits,
				});

			/** ACADEMIA ATENDE TODOS OS HORÁRIOS QUE O USUÁRIO DESEJA */
			if (isGymOpenHourStart && isGymOpenHourEnd) return true;
			/** ACADEMIA ATENDE AO HORÁRIO DO USUÁRIO PARCIALMENTE */
			if (isGymOpenHourStart || isGymOpenHourEnd) return true;

			return false;
		});

		this.gymService.setGymLocationFilter(this.gymLocationsFilter);
		this.unitsFound = this.gymLocationsFilter.length ?? 0;
		console.log('gymLocationsFilter', this.gymLocationsFilter);

		this.formOnSubmit.emit();
	}

	onClear() {
		this.gymFilter.reset();
	}
}
