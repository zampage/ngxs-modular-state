import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddAnimal } from 'src/lib/animal.actions';
import { DecrementVisitors, IncrementVisitors } from 'src/lib/visitor.actions';
import { BaselState, BaselActions } from './basel.state';

@Component({
  selector: 'app-basel',
  templateUrl: './basel.component.html',
  styleUrls: ['./basel.component.scss']
})
export class BaselComponent {

  @Select(BaselState.favoritAnimal)
  public favoriteAnimal$: Observable<string>;

  @Select(BaselState.animalState.getAnimals)
  public animals$: Observable<string[]>;

  @Select(BaselState.visitorState.getVisitors)
  public visitors$: Observable<number>;

  @Select(BaselState.visitorState.getRevenue)
  public revenue$: Observable<number>;

  constructor(private store: Store) {
    console.log(this.store.selectSnapshot(BaselState));
    console.log(BaselActions(AddAnimal).type);
  }

  public addAnimal(animal: string) {
    this.store.dispatch(new (BaselActions(AddAnimal))(animal));
  }

  public incrementVisitors() {
    this.store.dispatch(new (BaselActions(IncrementVisitors))());
  }

  public decrementVisitors() {
    this.store.dispatch(new (BaselActions(DecrementVisitors))());
  }

}
