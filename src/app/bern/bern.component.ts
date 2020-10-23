import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddAnimal } from 'src/lib/animal.actions';
import { DecrementVisitors, IncrementVisitors } from 'src/lib/visitor.actions';
import { BernState, BernActions } from './bern.state';

@Component({
  selector: 'app-bern',
  templateUrl: './bern.component.html',
  styleUrls: ['./bern.component.scss']
})
export class BernComponent {

  @Select(BernState.favoritAnimal)
  public favoriteAnimal$: Observable<string>;

  @Select(BernState.animalState.getAnimals)
  public animals$: Observable<string[]>;

  @Select(BernState.visitorState.getVisitors)
  public visitors$: Observable<number>;

  @Select(BernState.visitorState.getRevenue)
  public revenue$: Observable<number>;

  constructor(private store: Store) {
    console.log(this.store.selectSnapshot(BernState));
    console.log(BernActions(AddAnimal).type);
  }

  public addAnimal(animal: string) {
    this.store.dispatch(new (BernActions(AddAnimal))(animal));
  }

  public incrementVisitors() {
    this.store.dispatch(new (BernActions(IncrementVisitors))());
  }

  public decrementVisitors() {
    this.store.dispatch(new (BernActions(DecrementVisitors))());
  }

}
