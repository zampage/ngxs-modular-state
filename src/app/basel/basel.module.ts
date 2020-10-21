import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AnimalState } from 'src/lib/animal.state';
import { VisitorState } from 'src/lib/visitor.state';
import { BaselComponent } from './basel.component';
import { BaselState } from './basel.state';

@NgModule({
  declarations: [BaselComponent],
  imports: [CommonModule, NgxsModule.forFeature([BaselState, AnimalState, VisitorState])],
  exports: [BaselComponent]
})
export class BaselModule {}
