import {Component, Input, OnInit} from '@angular/core';
import {ColorSchemaType} from "../rating/rating.component";
import {UserService} from "../../services/user.service";
import {Review} from "../../models/review.modal";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  protected readonly ColorSchemaType = ColorSchemaType;
  protected usernames: { [id: number]: string } = {};

  @Input() reviews: Review[] = [];
  @Input() height: string = 'auto';

  constructor(
    private userService: UserService
  ) {
  }

  async ngOnInit() {
    for (const r of this.reviews) {
      this.usernames[r.userId] = (await this.userService.getUserById(r.userId)).username
    }
  }


  getUserName(id: number) {
    return this.usernames[id]
  }
}
