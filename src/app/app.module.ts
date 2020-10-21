import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { BernModule } from './bern/bern.module';
import { BaselModule } from './basel/basel.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(),
    BernModule,
    BaselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
