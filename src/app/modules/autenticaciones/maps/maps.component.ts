import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  
  lat : number;
  lng : number;
  zoom: number;
  title : string;
  

  constructor() { 

    
      this.title = 'Mapa del sitio';
      this.lat = -38.9513792 ;
      this.lng = -68.0558846;
      this.zoom = 19
      
      

  }

  ngOnInit(): void {
  }

}
