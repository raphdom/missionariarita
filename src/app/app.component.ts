import {AfterViewInit, Component} from '@angular/core';
declare var CBPGridGallery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{


  ngAfterViewInit() {
    new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
  }

}
