import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
    private apiUrl = 'http://localhost:3000/api/user'; // Tu URL base de la API (ej. http://localhost:3000/api)

  constructor(private http: HttpClient) { }

  // Método para registrar un usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        // Si el login es exitoso, guarda el token en el localStorage
        if (response && response.token) {
          localStorage.setItem('jwt_token', response.token);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Método para validar el token (tu nuevo endpoint /api/validate)
  validateToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      // Si no hay token, no hacemos la petición y lanzamos un error
      return throwError(() => new Error('No JWT token found.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/validate`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener usuarios (ejemplo de ruta protegida)
  getUsers(): Observable<any[]> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No JWT token found. Unauthorized.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/usuarios`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Método para remover el token (logout)
  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // Manejo de errores HTTP
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nDetails: ${JSON.stringify(error.error)}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }





}
