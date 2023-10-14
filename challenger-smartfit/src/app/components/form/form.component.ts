import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';

interface GymFilter {
	period: FormControl<string | null>;
	closedUnits: FormControl<boolean | null>;
}

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
	unitsFound = 0;
	gymFilter!: FormGroup<GymFilter>;

	constructor(private formBuilder: FormBuilder) {}

	/** MÉTODO QUE EXECUTA NA PRIMEIRA RENDERIZAÇÃO DO COMPONENTE */
	ngOnInit() {
		this.gymFilter = this.formBuilder.group<GymFilter>({
			period: new FormControl('', Validators.required),
			closedUnits: new FormControl(false, Validators.required),
		});
	}

	onSubmit() {
		console.log('onSubmit', this.gymFilter.value);
	}

	onClear() {
		this.gymFilter.reset();
		console.log('onClear', this.gymFilter.value);
	}
}
