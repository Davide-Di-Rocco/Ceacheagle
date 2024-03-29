import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../../../services/photo.service";
import {Photo} from "@capacitor/camera";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController} from "@ionic/angular";
import {Geolocation} from "@capacitor/geolocation";
import {Hint} from "../../../models/hint.model";
import {CacheService} from "../../../services/cache.service";
import {User} from "../../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {MyCache} from "../../../models/cache.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.page.html',
  styleUrls: ['./creation.page.scss'],
})
export class CreationPage implements OnInit {
  protected photo!: Photo;
  protected difficulty: number = 0;
  protected cacheFormModule: FormGroup
  protected page: number = 1
  protected ready = false
  protected cache!: MyCache | null
  protected path!: string
  protected enable: boolean = false
  private user!: User
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

  constructor(
    fb: FormBuilder,
    private photoService: PhotoService,
    private userService: UserService,
    private cacheService: CacheService,
    protected navController: NavController,
    private alert: AlertController,
    private route: ActivatedRoute
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
    this.user = await this.userService.getLoggedUser()
    const idParam = this.route.snapshot.queryParamMap.get('id');
    const id = idParam ? parseInt(idParam, 0) : null;
    this.cacheData.creatorId = this.user.id
    if (id) {
      this.cache = await this.cacheService.getCacheById(id)
      this.cacheData.creatorId = this.cache.creatorId
      this.cacheData.latitude = this.cache.latitude
      this.cacheData.longitude = this.cache.longitude
      this.difficulty = this.cache.difficulty
      this.photo = {
        base64String: this.cache.photo,
        saved: false,
        format: 'jpg'
      }
      this.photo.base64String = this.cache.photo
      this.cacheFormModule.controls["title"].setValue(this.cache.title);
      this.cacheFormModule.controls["description"].setValue(this.cache.description);
      this.cacheFormModule.controls["hint1"].setValue(this.getHint(1));
      this.cacheFormModule.controls["hint2"].setValue(this.getHint(2));
      this.cacheFormModule.controls["hint3"].setValue(this.getHint(3));
    }

    this.cacheFormModule.get('hint2')?.disable();
    this.cacheFormModule.get('hint3')?.disable();
    this.cacheFormModule.get('hint1')?.valueChanges.subscribe((value) => {
      if (!value) {
        this.cacheFormModule.get('hint2')?.disable();
        this.cacheFormModule.get('hint3')?.disable();
        this.cacheFormModule.patchValue({hint2: '', hint3: ''});
      } else {
        this.cacheFormModule.get('hint2')?.enable();
      }
    });

    // Disattiva hint3 quando hint2 non è stato compilato
    this.cacheFormModule.get('hint2')?.valueChanges.subscribe((value) => {
      if (!value) {
        this.cacheFormModule.get('hint3')?.disable();
        this.cacheFormModule.patchValue({hint3: ''});
      } else {
        this.cacheFormModule.get('hint3')?.enable();
      }
    });

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

      if (!this.cache)
        this.page = 2
      else {
        this.cacheService.updateCache(this.cacheData, this.cache.id).then(
          async response => {
            if (response) {
              await this.popup("Operazione riuscita", "Chache modificata correttamente!")
              await this.navController.navigateRoot(['sections/edit'], {
                queryParams: {
                  id: this.cache?.id
                }
              })
            } else {
              await this.popup("Operazione non riuscita", "Qualcosa è andato storto durante la modifica della cache!", "ESCI")
              this.navController.setDirection('back');
            }
          }
        )
      }
    } else {
      console.log(this.photo)
      console.log(this.difficulty)
      await this.popup(
        "Dati non corretti",
        "Completa tutti i campi necessari correttamente prima di proseguire"
      )
    }
  }

  updateDifficulty(value: number) {
    this.difficulty = value
  }

  async popup(title: string, message: string, button: string = "OK") {
    const popup = await this.alert.create({
      header: title,
      message: message,
      buttons: [button]
    })
    await popup.present()
  }

  async getPosition() {
    try {
      console.log("CALCOLO POSIZIONE")
      const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy: true})
      console.log("POSIZIONE CALCOLATA:\nlat: " + coordinates.coords.latitude, "\nlng: " + coordinates.coords.longitude)
      this.cacheData.latitude = coordinates.coords.latitude
      this.cacheData.longitude = coordinates.coords.longitude
      this.ready = true
    } catch (error) {
      await this.popup("ERRORE", "Impossibile calcolare la posizione della cache! Controlla di aver attivato la geolocalizzazione e riprova!")
      this.page = 2
    }
  }

  async onSave() {
    this.cacheService.createNewCache(this.cacheData).then(
      async response => {
        if (response > 0) {
          await this.popup("Operazione riuscita", "Cache salvata correttamente!")
          await this.navController.navigateRoot(['sections/edit'], {
            queryParams: {
              id: response
            }
          })
        } else {
          await this.popup("Operazione non riuscita", "Qualcosa è andato storto durante il salvataggio della cache!", "ESCI")
          await this.navController.navigateRoot(['sections/mycaches'])
        }
      }
    )
  }

  isBlank(text: string) {
    return text.trim().length < 1
  }

  getHint(level: number): string {
    if (this.cache) {
      const hint = this.cache.hints.find(hint => hint.level === level)
      if (hint) {
        return hint.hint
      }
    }
    return ""
  }

  startGif1Timer() {
    this.path = "assets/gif/posizione2.gif"
    setTimeout(() => {
      this.ready ? this.startGif2Timer() : this.startGif1Timer()
    }, 2000);
  }

  startGif2Timer() {
    this.path = "assets/gif/posizione3.gif"
    setTimeout(() => {
      this.path = "assets/img/posizione.jpg"
      this.enable = true
    }, 3190);
  }
}
