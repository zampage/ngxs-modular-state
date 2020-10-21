import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddAnimal } from 'src/lib/animal.actions';
import {BernState, BernActions} from './bern.state';

@Component({
  selector: 'app-bern',
  templateUrl: './bern.component.html',
  styleUrls: ['./bern.component.scss']
})
export class BernComponent {

  @Select(BernState.favoritAnimal)
  public favoriteAnimal$: Observable<string>;

  @Select(BernState.animal.getAnimals)
  public animals$: Observable<string[]>;

  constructor(private store: Store){
    console.log(BernActions(AddAnimal).type);
  }

  public addAnimal(animal: string) {
    this.store.dispatch(new (BernActions(AddAnimal))(animal)).subscribe();
  }

  public incrementVisitors() {
    //
  }

  public decrementVisitors() {
    //
  }

}
