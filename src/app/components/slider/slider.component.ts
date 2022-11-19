import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../../service/dataService';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { HalperService } from '../../service/halperService';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})

export class SliderComponent {

  @Output() modelChange: EventEmitter<number> = new EventEmitter();
  @ViewChild('_holder') public _holder: ElementRef;

  constructor(public data: DataService, public help: HalperService) {
  }

  public onWindowScroll(e): void {
    if (e.deltaY < 0 && this.data.scrollStatus) {
      this.data.scrollStatus = !this.data.scrollStatus;
    }
    if (e.deltaY > 0 && !this.data.scrollStatus) {
      this.data.scrollStatus = !this.data.scrollStatus;
    }
  }

  public slide(status: boolean): void {
    this.data.item.forEach((e, index) => {
      if (e.active) {
        const oldIndex = index;
        status ? index += 1 : index -= 1;
        if (this.data.item[index] !== undefined) {
          this.help._staticFunc(oldIndex);
          this.data.model = (this.data.boxWidth * index) + (this.data.boxWidth / 2);
          this.data.bullName = this.data.item[index].year;
          this.help.activeChangeEvent.emit(this.data.item[index]);
          this.help.colorChangeEvent.emit(this.data.item[index].color);
          this.help._activeFunc(index);
        }
      }
    });
  }


}
