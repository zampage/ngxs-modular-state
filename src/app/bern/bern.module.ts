import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BernComponent } from './bern.component';
import { BernState } from './bern.state';

@NgModule({
  declarations: [BernComponent],
  imports: [CommonModule, NgxsModule.forFeature([BernState])],
  exports: [BernComponent]
})
export class BernModule {}
