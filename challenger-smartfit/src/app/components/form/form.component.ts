import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import {
	CurrentDate,
	WeekdayNameToWeekdayIdx,
	weekdayNameToWeekdayIdx,
} from '~/app/helpers/current-date.helper';
import { GetGymService } from '~/app/services/get-gym.service';
import {
	FormattedFilter,
	GymLocations,
	Location,
} from '~/app/types/gym-locations.interface';

interface GymFilter {
	period: FormControl<string | null>;
	isViewClosedUnits: FormControl<boolean | null>;
}

function generateHourList(startHour: number, endHour: number) {
	const hourList = [];
	for (let i = startHour; i <= endHour; i++) {
		hourList.push(i);
	}
	return hourList;
}

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
	gymFilter!: FormGroup<GymFilter>;
	gymLocations!: GymLocations;
	gymLocationsFilter!: Location[];
	unitsFound = this.gymLocations?.locations.length ?? 0;

	currentDate = new Date();

	gymFilterPeriod = {
		morning: {
			start: 6,
			end: 12,
		},
		afternoon: {
			start: 12,
			end: 18,
		},
		night: {
			start: 18,
			end: 23,
		},
	};

	constructor(
		private formBuilder: FormBuilder,
		private getGymService: GetGymService
	) {}

	/** MÉTODO QUE EXECUTA NA PRIMEIRA RENDERIZAÇÃO DO COMPONENTE */
	ngOnInit() {
		this.gymFilter = this.formBuilder.group<GymFilter>({
			period: new FormControl('', Validators.required),
			isViewClosedUnits: new FormControl(false, Validators.required),
		});
		this.getGymService.getGym().subscribe((data) => {
			this.gymLocations = this.addFormattedFilter(data);
			this.unitsFound = this.gymLocations?.locations.length ?? 0;
			console.log(this.gymLocations);
		});
	}

	addFormattedFilter(gymLocations: GymLocations) {
		const currentDate = CurrentDate.getCurrentDate();
		const currentDateIdx = weekdayNameToWeekdayIdx[currentDate];
		const formattedFilterLocations = gymLocations.locations.map((location) => {
			const schedules = location?.schedules;

			const formattedFilter = schedules?.reduce((formattedFilter, schedule) => {
				const weekdays = schedule.weekdays.toLowerCase();
				const weekdaysNoPoints = weekdays.replace(/\./g, '');
				const weekdaysList = weekdaysNoPoints.split(' à ');
				const weekdayStart = weekdaysList?.[0];
				const weekdayEnd = weekdaysList?.[1];

				const weekdayStartIdx =
					weekdayNameToWeekdayIdx[weekdayStart as WeekdayNameToWeekdayIdx];
				const weekdayEndIdx =
					weekdayNameToWeekdayIdx[weekdayEnd as WeekdayNameToWeekdayIdx];

				const isMidWeek =
					currentDateIdx >= weekdayStartIdx && currentDateIdx <= weekdayEndIdx;
				const isWeekend = !weekdayEndIdx && weekdayStartIdx === currentDateIdx;

				if (isMidWeek || isWeekend) {
					const { gymOpeningHours } = this.gymAvailableTimes(schedule);

					return {
						currentOpeningHours: schedule,
						operatingRange: gymOpeningHours,
					};
				}

				return formattedFilter;
			}, {} as FormattedFilter);

			return {
				...location,
				formattedFilter,
			};
		});
		gymLocations.locations = formattedFilterLocations;
		return gymLocations;
	}

	gymAvailableTimes({ hour }: { hour: string }) {
		const isGymClosed = hour === 'Fechada';
		const [hourStart, hourEnd] = hour.replace(/h/g, '').split(' às ');
		const gymOpeningHours = generateHourList(
			Number(hourStart),
			Number(hourEnd)
		);

		const period = this.gymFilter.value.period;
		const filterPeriod =
			this.gymFilterPeriod[period as keyof typeof this.gymFilterPeriod];
		const isViewClosedUnits = this.gymFilter.value.isViewClosedUnits;

		if (isViewClosedUnits) {
			return {
				isGymOpenHourStart: true,
				isGymOpenHourEnd: true,
				gymOpeningHours,
			};
		}

		if (!isGymClosed && filterPeriod) {
			const isGymOpenHourStart = gymOpeningHours.includes(filterPeriod.start);
			const isGymOpenHourEnd = gymOpeningHours.includes(filterPeriod.end);

			return { isGymOpenHourStart, isGymOpenHourEnd, gymOpeningHours };
		}

		return {
			isGymOpenHourStart: null,
			isGymOpenHourEnd: null,
			gymOpeningHours,
		};
	}

	onSubmit() {
		// EXIBIR TODAS AS ACADEMIAS QUE SE ENCONTRAM ABERTAS EM FUNCIONAMENTO
		const gymOpenedUnitsLocations = this.gymLocations.locations.filter(
			(gymLocation) => gymLocation.opened
		);
		const period = this.gymFilter.value.period;

		if (period) {
			this.gymLocationsFilter = gymOpenedUnitsLocations.filter((location) => {
				const schedule = location.formattedFilter.currentOpeningHours;
				const { isGymOpenHourStart, isGymOpenHourEnd } =
					this.gymAvailableTimes(schedule);

				/** ACADEMIA ATENDE TODOS OS HORÁRIOS QUE O USUÁRIO DESEJA */
				if (isGymOpenHourStart && isGymOpenHourEnd) return true;
				/** ACADEMIA ATENDE AO HORÁRIO DO USUÁRIO PARCIALMENTE */
				if (isGymOpenHourStart || isGymOpenHourEnd) return true;

				return false;
			});
		}

		this.unitsFound = this.gymLocationsFilter.length ?? 0;
		console.log('gymLocationsFilter', this.gymLocationsFilter);
	}

	onClear() {
		this.gymFilter.reset();
	}
}
