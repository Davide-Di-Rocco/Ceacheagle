import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../../../services/photo.service";
import {Photo} from "@capacitor/camera";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.page.html',
  styleUrls: ['./creation.page.scss'],
})
export class CreationPage implements OnInit {
  photo!: Photo;
  protected cacheFormModule: FormGroup;

  constructor(
    fb: FormBuilder,
    private photoService: PhotoService,
    navController: NavController
  ) {
    this.cacheFormModule = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required],
      hint1: ['', Validators.required],
      hint2: ['', Validators.required],
      hint3: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  async addPhoto() {
    this.photo = await this.photoService.takeNewPhoto()
  }

}
