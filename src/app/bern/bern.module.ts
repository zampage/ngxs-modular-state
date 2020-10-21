import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AnimalState } from 'src/lib/animal.state';
import { BernComponent } from './bern.component';
import { BernState } from './bern.state';

@NgModule({
  declarations: [BernComponent],
  imports: [CommonModule, NgxsModule.forFeature([BernState, AnimalState])],
  exports: [BernComponent]
})
export class BernModule {}
