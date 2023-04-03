import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mission } from 'src/app/models/mission';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MissiondetailsComponent } from 'src/app/missiondetails/missiondetails.component';

@Component({
  selector: 'app-missionlist',
  template: `
  <div class="">
    <app-missionfilter [(data)]=dataSource/>
    <table mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="mission_name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let item"> {{ item.mission_name }} </td>
      </ng-container>
      <ng-container matColumnDef="launch_year">
        <th mat-header-cell *matHeaderCellDef> Launch Year </th>
        <td mat-cell *matCellDef="let item"> {{ item.launch_year }} </td>
      </ng-container>
      <ng-container matColumnDef="details">
        <th mat-header-cell *matHeaderCellDef> Details </th>
        <td mat-cell *matCellDef="let item" class="">
          {{ item.details }}
          <button mat-button (click)="handleButtonClick(item.flight_number)" class="self-end">
            More
          </button>
        </td>
      </ng-container>
      <ng-container matColumnDef="mission_patch_small">
        <th mat-header-cell *matHeaderCellDef> Mission Patch (small) </th>
        <td mat-cell *matCellDef="let item"> <img src={{item.links.mission_patch_small}} class="w-10 h-10"/> </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>
  `,
  styles: [
  ]
})
export class MissionlistComponent {
  dataSource = new MatTableDataSource<Mission>();
  displayedColumns = [
    'mission_name',
    'launch_year',
    'details',
    'mission_patch_small'
  ];

  constructor(private http: HttpClient, private dialogue: MatDialog) { }

  ngOnInit() {
    this.http.get('https://api.spacexdata.com/v3/launches')
      .subscribe(
        (data: any) => {
          this.dataSource.data = data;
        }
      );
  }

  handleButtonClick(flightNumber: number) {
    const dialogueRef = this.dialogue.open(
      MissiondetailsComponent,
      { data: { flightNumber }, width: '700px' }
    )
    console.log(flightNumber);
  }
}
