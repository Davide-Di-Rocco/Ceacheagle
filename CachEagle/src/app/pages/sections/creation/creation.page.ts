import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../../../services/photo.service";
import {Photo} from "@capacitor/camera";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController} from "@ionic/angular";
import {Geolocation} from "@capacitor/geolocation";
import {Hint} from "../../../models/hint.model";
import {AuthenticationService} from "../../../services/authentication.service";
import {CacheService} from "../../../services/cache.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.page.html',
  styleUrls: ['./creation.page.scss'],
})
export class CreationPage implements OnInit {
  protected photo!: Photo;
  private user!: User
  private difficulty: number = 0;
  private cacheData: {
    title: string,
    description: string,
    difficulty: number,
    hints: Hint[],
    photo: string,
    creatorId: number,
    latitude: number,
    longitude: number,
    reviews: []
  } = {
    title: "",
    description: "",
    difficulty: -1,
    hints: [],
    photo: "",
    creatorId: -1,
    latitude: -1,
    longitude: -1,
    reviews: []
  }

  protected cacheFormModule: FormGroup;
  protected page: number = 1;
  protected ready = false;

  constructor(
    fb: FormBuilder,
    private photoService: PhotoService,
    private authService: AuthenticationService,
    private cacheService: CacheService,
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

  async ngOnInit() {
    this.user = await this.authService.getLoggedUser()
    this.cacheData.creatorId = this.user.id
  }

  async addPhoto() {
    this.photo = await this.photoService.takeNewPhoto()
  }

  async onSubmit() {
    if (this.cacheFormModule.valid && this.difficulty > 0 && this.photo) {

      const hints: Hint[] = []
      hints.push(new Hint(1, this.cacheFormModule.value.hint1))
      if (this.cacheFormModule.value.hint2 && !this.isBlank(this.cacheFormModule.value.hint2))
        hints.push(new Hint(2, this.cacheFormModule.value.hint2))
      if (this.cacheFormModule.value.hint3 && !this.isBlank(this.cacheFormModule.value.hint3))
        hints.push(new Hint(3, this.cacheFormModule.value.hint3))

      this.cacheData.title = this.cacheFormModule.value.title
      if (this.photo.base64String != null) {
        this.cacheData.photo = this.photo.base64String
      }
      this.cacheData.description = this.cacheFormModule.value.description
      this.cacheData.difficulty = this.difficulty
      this.cacheData.hints = hints

      console.log(this.cacheData)

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

  async getPosition() {
    console.log("CALCOLO POSIZIONE")
    const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy: true})
    console.log("POSIZIONE CALCOLATA:\nlat: " + coordinates.coords.latitude, "\nlng: " + coordinates.coords.longitude)
    this.cacheData.latitude = coordinates.coords.latitude
    this.cacheData.longitude = coordinates.coords.longitude
    this.ready = true
  }

  async onSave() {
    this.cacheService.createNewCache(this.cacheData).then(
      async response => {
        if (response > 0) {
          await this.popup("POPUP", "SALVATAGGIO")
          await this.navController.navigateForward(['cacheDetailEdit'], {
            queryParams: {
              id: response
            }
          })
        }
      }
    )
    await this.popup("POPUP", "SALVATAGGIO")
  }

  isBlank(text: string) {
    return text.trim().length < 1
  }
}
