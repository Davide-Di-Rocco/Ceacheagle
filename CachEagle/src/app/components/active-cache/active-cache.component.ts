import {Component, OnInit} from '@angular/core';
import {ellipse} from "ionicons/icons";

@Component({
  selector: 'app-active-cache',
  templateUrl: './active-cache.component.html',
  styleUrls: ['./active-cache.component.scss'],
})
export class ActiveCacheComponent implements OnInit {
  protected photo!: string

  constructor() {
  }

  ngOnInit() {
  }

  protected readonly ellipse = ellipse;
}
