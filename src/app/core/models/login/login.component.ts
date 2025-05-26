import { Component, OnInit } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'my-angular-app';
  registerMessage: string = '';
  loginMessage: string = '';
  validationMessage: string = '';
  usersData: any[] = [];
  loggedInUser: any = null;

  correo: string = '';
  contrasena: string = '';

  // Inyecta el servicio en el constructor
  constructor(private authService: LoginServicesService, private router: Router) {}

  ngOnInit(): void {
    // Intenta validar el token al iniciar la aplicación
    this.checkAuthStatus();
  }

  // Ejemplo de login
  onLogin() {
    const credentials = {
      correo: this.correo,
      contraseña: this.contrasena // usa 'contraseña' si tu backend lo requiere
    };
  

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Respuesta de la API:', response);
        if (response.token) {
          localStorage.setItem('jwt_token', response.token);
          this.loginMessage = 'Login exitoso';
          this.checkAuthStatus();
          // Redirige al componente deseado, por ejemplo 'cliente'
          this.router.navigate(['/cliente']);

        } else {
          this.loginMessage = 'Credenciales incorrectas';
        }
      },
      error: (error) => {
        this.loginMessage = 'Error en el login: ' + (error.error?.message || error.message);
        console.error('Error en el login', error);
      }
    });
  }

  // Ejemplo de validación de token y obtención de datos del usuario
  checkAuthStatus() {
    const token = this.authService.getToken();
    if (!token) {
      // No mostrar error si no hay token (usuario no ha iniciado sesión)
      this.validationMessage = '';
      this.loggedInUser = null;
      return;
    }
    this.authService.validateToken().subscribe({
      next: (response) => {
        if (response.valid) {
          this.validationMessage = `Token válido. Usuario: ${response.user.username} (Rol: ${response.user.role})`;
          this.loggedInUser = response.user;
          this.getUsersFromApi();
          console.log('Token válido', response);
        } else {
          this.validationMessage = 'Token inválido o expirado.';
          this.loggedInUser = null;
        }
      },
      error: (error) => {
        this.validationMessage = 'Error al validar token: ' + error.message;
        this.loggedInUser = null;
        console.error('Error al validar token', error);
      }
    });
  }

  // Ejemplo de obtención de usuarios (requiere token)
  getUsersFromApi() {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.usersData = data;
        console.log('Usuarios obtenidos:', data);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  // Ejemplo de logout
  onLogout() {
    this.authService.logout();
    this.loggedInUser = null;
    this.validationMessage = 'Sesión cerrada.';
    this.usersData = [];
    this.loginMessage = '';
    this.registerMessage = '';
    console.log('Sesión cerrada');
  }
}
