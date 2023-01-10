import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent implements OnInit {
  @Input() selectedCountry: any;

  constructor() {}

  ngOnInit(): void {}
}
