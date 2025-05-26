import { Component } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  //Declaro las listas donde van a llegar los datos
  nombre: string = '';
  correo: string = ''
  contrasena: string = '';
  fechaDeNacimiento: string = '';
 constructor(private authService: LoginServicesService, private router: Router) {}
  onRegister() {
    //Declaro una interfaz para los datos del registro
    // y los asigno a un objeto
    // Aquí puedes hacer la llamada al servicio de registro
    const registros = {
      nombre: this.nombre,
      correo: this.correo,
      contraseña: this.contrasena,
      fechaDeNacimiento: this.fechaDeNacimiento // <-- aquí el nombre debe coincidir
    };

    this.authService.register(registros).subscribe({
      next: (response) => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (error) => {
       alert("Error")
       console.log(this.nombre, this.correo, this.contrasena, this.fechaDeNacimiento);
      }
     });
   }







}
