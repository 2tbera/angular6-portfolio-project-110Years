import {Injectable, EventEmitter, ElementRef, QueryList, Inject} from '@angular/core';
@Injectable()
export class HalperService {

  public isLoading: boolean;

  public colorChangeEvent: EventEmitter<any> = new EventEmitter();
  public activeChangeEvent: EventEmitter<any> = new EventEmitter();

  public _active: QueryList<ElementRef>;
  public _progress: QueryList<ElementRef>;
  public _static: QueryList<ElementRef>;

  _activeFunc (activeIndex: number) {
    const _active = this._active['_results'];
    _active[activeIndex].nativeElement.beginElement();
  }

  _progressFunc (activeIndex: number) {
    const _active = this._progress['_results'];
    _active[activeIndex].nativeElement.beginElement();
  }

  _staticFunc (activeIndex: number) {
    const _active = this._static['_results'];
    _active[activeIndex].nativeElement.beginElement();
  }

}
