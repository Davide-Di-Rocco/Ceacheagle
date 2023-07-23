import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../../../services/photo.service";
import {Photo} from "@capacitor/camera";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController} from "@ionic/angular";
import {Geolocation} from "@capacitor/geolocation";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.page.html',
  styleUrls: ['./creation.page.scss'],
})
export class CreationPage implements OnInit {
  protected photo!: Photo;
  private difficulty: number = 0;

  protected cacheFormModule: FormGroup;
  protected page: number = 1;

  constructor(
    fb: FormBuilder,
    private photoService: PhotoService,
    protected navController: NavController,
    private alert: AlertController
  ) {
    this.cacheFormModule = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      hint1: ['', Validators.required],
      hint2: [''],
      hint3: [''],
    })
  }

  ngOnInit() {
  }

  async addPhoto() {
    this.photo = await this.photoService.takeNewPhoto()
  }

  async onSubmit() {
    if (this.cacheFormModule.valid && this.difficulty > 0 && this.photo) {
      let title = this.cacheFormModule.value.title;
      let description = this.cacheFormModule.value.description;
      let hint1 = this.cacheFormModule.value.hint1;
      let hint2 = this.cacheFormModule.value.hint2;
      let hint3 = this.cacheFormModule.value.hint3;
      let photo = this.photo

      console.log("title: " + title);
      console.log("photo: " + photo);
      console.log("description: " + description);
      console.log("difficulty: " + this.difficulty);
      console.log("hint1: " + hint1);
      console.log("hint2: " + hint2);
      console.log("hint3: " + hint3);

      this.page = 2

    } else {
      await this.popup(
        "Dati non corretti",
        "Completa tutti i campi necessari correttamente prima di proseguire"
      );
    }
  }

  updateDifficulty(value: number) {
    this.difficulty = value
  }

  async popup(title: string, message: string) {
    const popup = await this.alert.create({
      header: title,
      message: message,
      buttons: ["OK"]
    })
    await popup.present()
  }

  async onSave() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
  }
}
