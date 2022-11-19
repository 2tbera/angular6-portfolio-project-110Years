import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/dataService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {
    console.log(this.data.activeItem.color);
  }

}
