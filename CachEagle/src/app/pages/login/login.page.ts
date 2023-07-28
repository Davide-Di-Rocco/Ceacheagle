import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertController, NavController} from "@ionic/angular";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    protected loginFormModule: FormGroup
    protected loading: boolean = false

    constructor(
        fb: FormBuilder,
        private authService: AuthenticationService,
        private navController: NavController,
        private alert: AlertController,
    ) {
        this.loginFormModule = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })
        this.authService.logout()
    }

    async ngOnInit() {
        await this.authService.fixCompleted()
    }

    async onSubmit() {
        try {
            this.loading = true
            if (this.loginFormModule.valid) {
                let username = this.loginFormModule.value.username.trim()
                let password = this.loginFormModule.value.password.trim()
                const response = await this.authService.login(username, password)
                this.loading = false
                if (response === "success")
                    await this.navController.navigateRoot("sections/search")
                else if (response === "credential_error")
                    await this.popup("Impossibile accedere", "Credenziali sbagliate! Controlla le credenziali e riprova")
                else if (response === "server_error")
                    await this.popup("Impossibile accedere", "Impossibile stabilire la connessione al server")
                else
                    await this.popup("Impossibile accedere", "Errore sconosciuto")
            } else await this.popup("Impossibile accedere", "Compila correttamente tutti campi e riprova")
        } catch (error) {
            await this.popup("Impossibile accedere", "Impossibile stabilire la connessione al server")
        }
    }

    async popup(title: string, message: string) {
        const popup = await this.alert.create({
            header: title,
            message: message,
            buttons: ["OK"]
        });
        await popup.present();
    }

    async onRegister() {
        await this.navController.navigateRoot("registration")
    }
}
