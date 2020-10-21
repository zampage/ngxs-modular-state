import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddAnimal } from 'src/lib/animal.actions';
import { DecrementVisitors, IncrementVisitors } from 'src/lib/visitor.actions';
import {BaselState, AnimalActions, VisitorActions} from './basel.state';

@Component({
  selector: 'app-basel',
  templateUrl: './basel.component.html',
  styleUrls: ['./basel.component.scss']
})
export class BaselComponent {

  @Select(BaselState.favoritAnimal)
  public favoriteAnimal$: Observable<string>;

  @Select(BaselState.animal.getAnimals)
  public animals$: Observable<string[]>;

  @Select(BaselState.visitor.getVisitors)
  public visitors$: Observable<number>;

  constructor(private store: Store){
    console.log(this.store.selectSnapshot(BaselState));
    console.log(AnimalActions(AddAnimal).type);
  }

  public addAnimal(animal: string) {
    this.store.dispatch(new (AnimalActions(AddAnimal))(animal));
  }

  public incrementVisitors() {
    this.store.dispatch(new (VisitorActions(IncrementVisitors))());
  }

  public decrementVisitors() {
    this.store.dispatch(new (VisitorActions(DecrementVisitors))());
  }

}
