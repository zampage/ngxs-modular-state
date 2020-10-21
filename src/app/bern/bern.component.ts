import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {BernState} from './bern.state';

@Component({
  selector: 'app-bern',
  templateUrl: './bern.component.html',
  styleUrls: ['./bern.component.scss']
})
export class BernComponent {

  @Select(BernState.favoritAnimal)
  public favoriteAnimal$: Observable<string>;

  public addAnimal(animal: string) {
    console.log(animal);
  }

  public incrementVisitors() {
    //
  }

  public decrementVisitors() {
    //
  }

}
