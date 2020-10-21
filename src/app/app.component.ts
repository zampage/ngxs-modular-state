import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddAnimal, getAction } from './lib/animal.actions';
import { UpdateFoo } from './state/main.actions';
import { getMainAction, MainState } from './state/main.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(MainState.foo)
  public foo$: Observable<string>;

  constructor(private store: Store) {
    this.store.select(MainState.foo).subscribe(foo => console.log('foo', foo));
    this.store.select(MainState.animalState.getAnimals).subscribe(animals => console.log('animals', animals));
    // this.store.dispatch(new AddAnimal('Bear'));
    this.store.dispatch(new (getMainAction(AddAnimal))('Dog'));

    console.log(getMainAction(AddAnimal).type);
  }

  public updateState(): void {
    this.store.dispatch(new UpdateFoo(Math.random().toString()));
  }
}
