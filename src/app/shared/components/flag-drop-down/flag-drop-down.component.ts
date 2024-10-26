import { Component, EventEmitter, Input, Output } from '@angular/core';
import { } from "../../../../assets/img/en.png";
import { NgClass } from '@angular/common';

interface IFlag {
  id: string
  flag: string
  name: string
}

@Component({
  selector: 'app-flag-drop-down',
  standalone: true,
  imports: [NgClass],
  templateUrl: './flag-drop-down.component.html',
  styleUrl: './flag-drop-down.component.scss'
})

export class FlagDropDownComponent {
  @Input({ required: true }) flags: IFlag[] = [{ id: '1', flag: '../../../../assets/img/ar.png', name: 'egypt' }, { id: '2', flag: '../../../../assets/img/en.png', name: 'egypt' }]
  @Input({ required: true }) enableBorder: boolean = true
  @Input({ required: true }) enableCaroot: boolean = true
  @Output() action = new EventEmitter<IFlag>()
  selectedFlag: IFlag = this.flags[0]
  isVisible: boolean = false

  showList() {
    this.isVisible = !this.isVisible
  }

  onSelect(flag: IFlag) {
    this.selectedFlag = flag
    this.action.emit(flag)
    console.log(flag);

  }
}
