import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mission } from 'src/app/models/mission';
import { SpacexapiService } from 'src/app/spacexapi.service';

@Component({
  selector: 'app-missiondetails',
  template: `
  <div class="p-10 flex flex-col space-y-3">
    <h1 class="text-4xl">Mission Details</h1>
    <div class="w-full flex flex-row items-center">
      <div class="w-25 h-25 min-w-1/2">
        <img src="{{flightData.links.mission_patch_small}}" class="w-30 h-30 p-5"/>
      </div>
      <div class="flex flex-col flex-grow space-y-3">
        <div>
          <h1 class="text-xl">Mission - {{flightData.mission_name}}</h1>
          <h3> Launch Year: {{flightData.launch_year}}</h3>
        </div>
        <div class="">
          <h1 class="text-xl">Rocket</h1>
          <h3> Name: {{flightData.rocket.rocket_name}} </h3>
          <h3> Type: {{flightData.rocket.rocket_type}} </h3>
          <h3> First Stage: {{flightData.rocket.first_stage.cores[0].core_serial}} </h3>
          <h3> Second Stage: {{flightData.rocket.second_stage.block}} </h3>
        </div>
      </div>
    </div>
    <div>
      <h1 class="text-xl">Launch Site</h1>
      <h3> Site Name: {{flightData.launch_site.site_name_long}} ({{flightData.launch_site.site_name}})</h3>
    </div>

    <div>
      <h1 class="text-xl">Launch Details</h1>
      <h3> Details: {{flightData.details || 'N/A'}} </h3>
      <h3> Launch Date: {{flightData.launch_date_local}} </h3>
      <h3> Launch Success: {{flightData.launch_success}} </h3>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class MissiondetailsComponent {
  flight_number: number;
  flightData: Mission;

  constructor(
    public dialogueRef: MatDialogRef<MissiondetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spacexApi: SpacexapiService,
  ) {
    console.log(data);
    this.flight_number = data.flightNumber;
  }

  ngOnInit() {
    console.log(this.flight_number);

    this.spacexApi.getMission(this.flight_number)
      .subscribe(
        (data: any) => {
          this.flightData = data;
        }
      );
  }
}
