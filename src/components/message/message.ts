import { Component } from '@angular/core';

/**
 * Generated class for the MessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message',
  templateUrl: 'message.html'
})
export class MessageComponent {

  text: string;

  constructor() {
    console.log('Hello MessageComponent Component');
    this.text = 'Hello World';
  }

}
