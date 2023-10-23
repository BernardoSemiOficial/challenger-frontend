import {
	FormattedFilter,
	GymLocations,
} from '../types/gym-locations.interface';
import {
	DateHelper,
	WeekdayNameToWeekdayIdx,
	weekdayNameToWeekdayIdx,
} from './date.helper';

export class GymLocationFilter {
	static addFormattedFilter(gymLocations: GymLocations) {
		const currentDate = DateHelper.getCurrentDate();
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
					const { gymOpeningHours } = this.gymAvailableTimes({
						hour: schedule.hour,
					});

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

	static gymAvailableTimes({
		hour,
		period,
		isViewClosedUnits,
	}: {
		hour: string;
		period?: string;
		isViewClosedUnits?: boolean;
	}) {
		const gymFilterPeriod = {
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
		const isGymClosed = hour === 'Fechada';
		const [hourStart, hourEnd] = hour.replace(/h/g, '').split(' às ');
		const gymOpeningHours = DateHelper.generateHourList(
			Number(hourStart),
			Number(hourEnd)
		);

		const filterPeriod =
			gymFilterPeriod[period as keyof typeof gymFilterPeriod];

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
}
