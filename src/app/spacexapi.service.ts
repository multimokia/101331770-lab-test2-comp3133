import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  constructor(private http: HttpClient) { }

  getMissions() {
    return this.http.get('https://api.spacexdata.com/v3/launches');
  }

  getMission(id: number) {
    return this.http.get(`https://api.spacexdata.com/v3/launches/${id}`);
  }

  getMissionsByYear(year: number) {
    return this.http.get(`https://api.spacexdata.com/v3/launches?launch_year=${year}`);
  }
}
