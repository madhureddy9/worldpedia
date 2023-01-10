import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { consts } from '../utils/consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countriesData: any;

  constructor(private http: HttpClient) {}

  getAllCountries() {
    const observable = new Observable((observer) => {
      this.http.get(consts.GET_ALL_COUNTRIES_URL).subscribe({
        next: (data: any) => {
          this.countriesData = data;
          observer.next();
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('done');
          observer.complete();
        },
      });
    });

    return observable;
  }

  searchCountries(country: string) {
    const observable = new Observable((observer) => {
      this.http.get(consts.SEARCH_COUNTRIES_URL + country).subscribe({
        next: (data: any) => {
          this.countriesData = data;
          observer.next();
        },
        error: (err: any) => {
          this.countriesData = [];
          observer.next();
          console.log(err);
        },
        complete: () => {
          console.log('done');
          observer.complete();
        },
      });
    });

    return observable;
  }

  getCurrencyValues(currencyObj: any) {
    const keys = currencyObj ? Object.keys(currencyObj) : [];
    const currencies: any = [];
    keys.forEach((data, i) => {
      currencies.push(Object.values(currencyObj[data])[0]);
    });
    return currencies;
  }

  filterCountryData() {
    return this.countriesData.map((data: any) => {
      const obj: any = {};
      obj.name = data.name.common;
      obj.region = data.region;
      obj.flag = data.flags.svg;
      obj.languages = data.languages ? Object.values(data.languages) : [];
      obj.timezone = data.timezones;
      obj.currencies = this.getCurrencyValues(data.currencies);
      obj.capital = data.capital;
      obj.population = data.population;
      return obj;
    });
  }
}
