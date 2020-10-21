import { Component } from '@angular/core';

@Component({
  selector: 'app-basel',
  templateUrl: './basel.component.html',
  styleUrls: ['./basel.component.scss']
})
export class BaselComponent {

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
