export const weekdayIdxToWeekdayName = {
	0: 'dom',
	1: 'seg',
	2: 'ter',
	3: 'qua',
	4: 'qui',
	5: 'sex',
	6: 'sáb',
} as const;

export type WeekdayNameToWeekdayIdx = keyof typeof weekdayNameToWeekdayIdx;

export const weekdayNameToWeekdayIdx = {
	dom: 0,
	seg: 1,
	ter: 2,
	qua: 3,
	qui: 4,
	sex: 5,
	sáb: 6,
} as const;

export class DateHelper {
	static getCurrentDate() {
		const weekdayIndex = new Date().getDay();
		return weekdayIdxToWeekdayName[
			weekdayIndex as keyof typeof weekdayIdxToWeekdayName
		];
	}

	static generateHourList(startHour: number, endHour: number) {
		const hourList = [];
		for (let i = startHour; i <= endHour; i++) {
			hourList.push(i);
		}
		return hourList;
	}
}
