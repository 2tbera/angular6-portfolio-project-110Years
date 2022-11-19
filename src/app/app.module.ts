import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {SliderBarComponent} from './components/slider-bar/slider-bar.component';
import {SliderComponent} from './components/slider/slider.component';
import {DataService} from './service/dataService';
import {HeaderComponent} from './components/header/header.component';
import {HalperService} from './service/halperService';

@NgModule({
  declarations: [
    AppComponent,
    SliderBarComponent,
    SliderComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    DataService,
    HalperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
