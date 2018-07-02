import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Generated class for the PinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent {
  @Input() pagetitle: String = "Enter Pin";

  pin: string = "";

  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  @Output() close: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  emitEvent() {
    if (this.pin.length === 4) {
      this.change.emit(this.pin);
    }
  }

  cancelPin() {
    this.close.emit('close');
  }

  handleInput(pin: string) {
    if (pin === "clear") {
      // console.log(this.pin.length);

      // console.log(this.pin.substring(0, this.pin.length - 1));
      // this.pin = "";
      this.pin = this.pin.substring(0, this.pin.length - 1);
      return;
    }

    if (this.pin.length === 4) {
      return;
    }
    this.pin += pin;
  }
}
