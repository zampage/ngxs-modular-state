import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { MainState } from './state/main.state';
import { AnimalState } from './lib/animal.state';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([MainState, AnimalState]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
