import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Mission } from 'src/app/models/mission';
import { SpacexapiService } from 'src/app/spacexapi.service';

@Component({
  selector: 'app-missionfilter',
  template: `
    <div class="w-full">
      <div class="flex flex-col w-full items-center">
        <h2 class="text-2xl">Launch Year</h2>
        <div class="flex flex-row">
          <button mat-button (click)="handleButtonClick(2006)">
            2006
          </button>
          <button mat-button (click)="handleButtonClick(2007)">
            2007
          </button>
          <button mat-button (click)="handleButtonClick(2008)">
            2008
          </button>
          <button mat-button (click)="handleButtonClick(2009)">
            2009
          </button>
          <button mat-button (click)="handleButtonClick(2010)">
            2010
          </button>
          <button mat-button (click)="handleButtonClick(2011)">
            2011
          </button>
          <button mat-button (click)="handleButtonClick(2012)">
            2012
          </button>
          <button mat-button (click)="handleButtonClick(2013)">
            2013
          </button>
          <button mat-button (click)="handleButtonClick(2014)">
            2014
          </button>
          <button mat-button (click)="handleButtonClick(2015)">
            2015
          </button>
          <button mat-button (click)="handleButtonClick(2016)">
            2016
          </button>
          <button mat-button (click)="handleButtonClick(2017)">
            2017
          </button>
          <button mat-button (click)="handleButtonClick(2018)">
            2018
          </button>
          <button mat-button (click)="handleButtonClick(2019)">
            2019
          </button>
          <button mat-button (click)="handleButtonClick(2020)">
            2020
          </button>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class MissionfilterComponent {
  @Input() data: MatTableDataSource<Mission>;
  @Output() dataChange = new EventEmitter<MatTableDataSource<Mission>>();

  constructor(private spacexApi: SpacexapiService) { }

  handleButtonClick(year: number) {
    console.log(year);

    this.spacexApi.getMissionsByYear(year)
    .subscribe(
      (data: any) => {
        this.data.data = data;
      }
    );

  }
}
