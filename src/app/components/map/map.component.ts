import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/classes/marker.class';
import { MatSnackBar } from '@angular/material';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MapEditComponent } from '../maps/map-edit.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  markers:Marker[]=[];

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public snackbar:MatSnackBar, public dialog:MatDialog) { 
    if (localStorage.getItem('markers')){
      this.markers = JSON.parse(localStorage.getItem('markers'));
    }
  }

  ngOnInit() {
  }

  addMarker(event){
    const coords = event.coords;
    console.log(event);

    const newMarker = new Marker(coords.lat,coords.lng);
    this.markers.push(newMarker);
    this.saveStorage();
    this.snackbar.open('Marker added', 'close', { duration : 3000 });
  }

  editMarker(marker:Marker){
    const dialogRef = this.dialog.open(MapEditComponent, {
      width: '250px',
      data: {title: marker.title, desc: marker.desc}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (!result){
        return;
      }
      marker.title = result.title;
      marker.desc = result.desc;

      this.saveStorage();
      this.snackbar.open('Marker updated', 'close', { duration : 3000 });
    });
  }

  deleteMarker(i){
    this.markers.splice(i,1);
    this.saveStorage();
    this.snackbar.open('Marker removed', 'close');
  }

  saveStorage(){
    localStorage.setItem('markers',JSON.stringify(this.markers));
  }

}
