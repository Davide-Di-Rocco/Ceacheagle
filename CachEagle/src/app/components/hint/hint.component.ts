import {Component, Input, OnInit} from '@angular/core';
import {Hint} from "../../models/hint.model";

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent implements OnInit {

  @Input() hints: Hint[] = [];
  @Input() height: string = 'auto';
  @Input() visible: boolean = false

  protected selectedHint = 0

  constructor() {
  }

  ngOnInit() {
    this.hints = this.hints.sort((a, b) => a.level - b.level);
  }

  backHint() {
    this.selectedHint -= 1
  }

  nextHint() {
    this.selectedHint += 1
  }
}
