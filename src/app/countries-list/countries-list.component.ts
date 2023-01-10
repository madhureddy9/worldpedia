import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  countriesList: any;

  paginatedCountries: any;
  lastCountryIndex: number = 20;

  searchTxt: string = '';
  selectedCountry: any = null;

  @ViewChild('countryModal') public templateModal: any;

  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    this.fetchAllCountries();
  }

  fetchAllCountries() {
    // get country data
    this.countryService.getAllCountries().subscribe({
      next: () => {
        this.countriesList = this.countryService.filterCountryData();
        this.paginatedCountries = this.countriesList.slice(
          0,
          this.lastCountryIndex
        );
      },
    });
  }

  onNextPage() {
    this.paginatedCountries = this.countriesList.slice(
      this.lastCountryIndex,
      this.lastCountryIndex + 20
    );
    this.lastCountryIndex = this.lastCountryIndex + 20;
  }

  onPreviousPage() {
    this.paginatedCountries = this.countriesList.slice(
      this.lastCountryIndex - 40,
      this.lastCountryIndex - 20
    );
    this.lastCountryIndex = this.lastCountryIndex - 20;
  }

  onSearchText() {
    if (this.searchTxt === '') {
      this.fetchAllCountries();
    } else {
      this.countryService.searchCountries(this.searchTxt).subscribe({
        next: () => {
          this.countriesList = this.countryService.filterCountryData();
          this.paginatedCountries = this.countriesList.slice(
            0,
            this.lastCountryIndex
          );
        },
      });
    }
  }

  onSelectCountry(country: any) {
    this.selectedCountry = country;
    this.templateModal?.open();
  }
}
