export interface GymLocations {
	current_country_id: number;
	locations: Location[];
}

export interface Location {
	id: number;
	title: string;
	content: string;
	opened: true;
	mask: string;
	towel: string;
	fountain: string;
	locker_room: string;
	schedules: Schedule[];
}

interface Schedule {
	weekdays: string;
	hour: string;
}
