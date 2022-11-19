import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { DataService } from './service/dataService';
import { HalperService } from './service/halperService';
import { CursorClass } from './core/class/cursorClass';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends CursorClass implements OnInit {

  private color: any;

  constructor(public data: DataService, @Inject(ElementRef) public element: ElementRef , public help: HalperService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.data.item[0].active = true;
    this.data.item[0].progress = true;
    this.data.activeItem = this.data.item[0];
    this.element.nativeElement.style.setProperty('--color', this.data.item[0].color);
    this.data.bullName = this.data.item[0].year;

    this.help.colorChangeEvent.subscribe( value => {
      this.element.nativeElement.style.setProperty('--color', value);
    });

    this.help.activeChangeEvent.subscribe( value => {
      this.data.item.forEach(e => {
        if (e.active) { this.color = e; }
      });

      if (value.id !== this.color.id) {
        this.color.active = false;
        this.data.bullBounce = true;
        if (this.data.background === 0) { this.data.background = 1; } else { this.data.background = 0; }
        setTimeout(() => {
          this.data.activeItem = value;
          value.active = true;
          this.color = value;
        }, 10);
        setTimeout(() => {
          this.data.bullBounce = false;
        }, 1000);
      }
    });

  }

}
