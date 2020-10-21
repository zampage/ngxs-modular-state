import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BaselComponent } from './basel.component';
import { BaselState } from './basel.state';

@NgModule({
  declarations: [BaselComponent],
  imports: [CommonModule, NgxsModule.forFeature([BaselState])],
  exports: [BaselComponent]
})
export class BaselModule {}
