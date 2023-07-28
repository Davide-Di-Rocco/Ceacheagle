import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AlertController, NavController} from "@ionic/angular";
import {RegistrationService} from "../../services/registration.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    protected registrationFormModule: FormGroup;
    protected loading = false

    constructor(
        private fb: FormBuilder,
        private navController: NavController,
        private alert: AlertController,
        private registrationService: RegistrationService
    ) {
        this.registrationFormModule = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', Validators.required],
            passwordControl: ['', Validators.required],
        }, {
            validators: this.passwordMatchValidator()
        });
    }

    ngOnInit() {
    }

    async onCreate() {
        if (this.registrationFormModule.valid) {
            const email = this.registrationFormModule.value.email.trim();
            const username = this.registrationFormModule.value.username.trim();
            const password = this.registrationFormModule.value.password.trim();

            try {
                this.loading = true
                const registrationResult = await this.registrationService.register(username, email, password);
                this.loading = true
                if (registrationResult === 'success') {
                    await this.navController.navigateRoot("login");
                    await this.popup("UTENTE CREATO", "Registrazione effettuata con successo");
                } else if (registrationResult === 'duplicate_email') {
                    await this.popup("ERRORE", "Dati non validi. Email già esistente");
                } else if (registrationResult === 'duplicate_username') {
                    await this.popup("ERRORE", "Dati non validi. Username già esistente");
                } else {
                    await this.popup("ERRORE", "Errore durante la registrazione");
                }
            } catch (error) {
                await this.popup("ERRORE", "Errore durante la registrazione");
            }
        } else {
            const emailErrors = this.registrationFormModule.get('email')?.errors;
            const usernameErrors = this.registrationFormModule.get('username')?.errors;
            const passwordErrors = this.registrationFormModule.get('password')?.errors;
            const passwordControlErrors = this.registrationFormModule.get('passwordControl')?.errors;

            if (emailErrors?.['required']) {
                await this.popup('ERRORE', 'L\'email è un campo obbligatorio');
            } else if (emailErrors?.['email']) {
                await this.popup('ERRORE', 'L\'email non è valida');
            } else if (usernameErrors?.['required']) {
                await this.popup('ERRORE', 'L\'username è un campo obbligatorio');
            } else if (passwordErrors?.['required']) {
                await this.popup('ERRORE', 'La password è un campo obbligatorio');
            } else if (passwordControlErrors?.['passwordMismatch']) {
                await this.popup('ERRORE', 'Le password non corrispondono');
            }
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

    async onCancel() {
        await this.navController.navigateRoot("login");
    }

    passwordMatchValidator(): ValidatorFn {
        return (control: AbstractControl) => {
            const password = control.get('password')?.value
            const passwordControl = control.get('passwordControl')?.value

            if (password !== passwordControl) {
                control.get('passwordControl')?.setErrors({passwordMismatch: true});
            } else {
                control.get('passwordControl')?.setErrors(null);
            }
            return null;
        };
    }
}
