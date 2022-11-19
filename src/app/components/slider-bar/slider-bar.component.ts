import {
  Component, ElementRef, Inject, OnInit, Renderer2, ViewChild,
  ViewChildren, QueryList, AfterViewInit
} from '@angular/core';
import {DataService} from '../../service/dataService';
import {HalperService} from '../../service/halperService';

@Component({
  selector: 'app-slider-bar',
  templateUrl: './slider-bar.component.html'
})
export class SliderBarComponent implements OnInit, AfterViewInit {

  public max: number;

  @ViewChild('_line') public _line: ElementRef;

  // svg animation
  @ViewChildren('_active') public _active: QueryList<ElementRef>;
  @ViewChildren('_progress') public _progress: QueryList<ElementRef>;
  @ViewChildren('_static') public _static: QueryList<ElementRef>;
  // svg animation end

  public progressValue: any;
  public bullStatus: boolean;
  private rect: any;

  public color: any;

  private destroyMouseMove: any;
  private destroyMouseUp: any;

  constructor(public data: DataService, public help: HalperService, @Inject(ElementRef) public element: ElementRef,
              @Inject(Renderer2) public renderer: Renderer2) {
  }

  ngOnInit(): any {
    this.renderer.listen(this._line.nativeElement, 'mousedown', (event: any) => this.begin(event));
    this.max = this._line.nativeElement.getBoundingClientRect().width;
    this.data.model = Math.floor(this.max / this.data.item.length / 2);
    this.data.boxWidth = this.max / this.data.item.length;
  }

  begin(event: any) {
    this.data.item.forEach((e, index) => {
      if (e.active) this.help._staticFunc(index);
    });
    this.bullStatus = true;
    const process = 'mousemove', end = 'mouseup';
    this.rect = this._line.nativeElement.getBoundingClientRect();
    this.end();
    this.process(event);
    this.destroyMouseMove = this.renderer.listen('document', process, (e: any) => this.process(e));
    this.destroyMouseUp = this.renderer.listen('document', end, () => this.end());
  }

  end() {
    if (this.destroyMouseMove) {
      this.destroyMouseMove();
      this.destroyMouseMove = null;
    }
    if (this.destroyMouseUp) {
      this.bullStatus = false;
      const box = this.max / this.data.item.length;
      let activeIndex = Math.floor(Math.floor(this.data.model) / box);
      if (activeIndex === this.data.item.length) { activeIndex = this.data.item.length - 1; }
      const activeBox = this.data.item[activeIndex];
      this.data.bullName = activeBox.year;
      // add
      this.help.activeChangeEvent.emit(activeBox);
      this.help.colorChangeEvent.emit(activeBox.color);
      // add end
      this.data.model = (Math.floor(Math.floor(this.data.model) / box) * box) + box / 2;
      this.destroyMouseUp();
      this.destroyMouseUp = null;
      this.help._activeFunc(activeIndex);
    }
  }

  process(e: any) {
    let value = e.clientX - this.rect.left;
    if (value >= this.max) value = this.max - 1;
    value = Math.max(value, 0);
    value = Math.min(value, this.rect.width);
    value = value / this.rect.width;
    this.data.model = this.max * value;

    let activeIndex = Math.floor(Math.floor(this.data.model) / this.max / this.data.item.length);
    if (activeIndex === this.data.item.length) { activeIndex = this.data.item.length - 1; }
    const activeBox = this.data.item[activeIndex];

    // add
    if (this.progressValue === undefined) {
      this.data.item.forEach(e => {
        if (e.progress) this.progressValue = e;
      });
    }

    if (activeBox.id !== this.progressValue.id) {
      this.data.item.forEach((e, index) => {
        if (e.id === this.progressValue.id) {
          this.help._staticFunc(index);
        }
      });

      this.help._progressFunc(activeIndex);
      this.progressValue = activeBox;
    }
  }


  ngAfterViewInit() {
    this.help._active = this._active;
    this.help._progress = this._progress;
    this.help._static = this._static;
    let activeindex = 0;
    this.data.item.forEach((e, index) => e.active && (activeindex = index));
    this.help._activeFunc(activeindex);
  }
}
