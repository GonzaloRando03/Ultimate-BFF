import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import {
  eliminarUsuarioStorage,
  getUsuarioStorage,
  guardarUsuarioStorage,
} from 'src/app/shared/utils/storage';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from 'src/environments/environment';
import { ERRORES_FIREBASE } from '../constants/firebaseErrors';
import { UserDatabaseService } from 'src/app/server/user/user-database.service';
import { ToastService } from './toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from './proyecto.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: Usuario | null;
  private user$: Subject<Usuario | null> = new Subject();

  constructor(
    private userDatabase: UserDatabaseService,
    private toast: ToastService,
    private router: Router,
    private proyectoService:ProyectoService
  ) {
    this.user = getUsuarioStorage();
  }

  setUser(u: Usuario | null): void {
    this.user = u;
    this.user$.next(this.user);
  }

  getUser(): Observable<Usuario | null> {
    return this.user$.asObservable();
  }

  getUserValue(): Usuario | null {
    return this.user;
  }

  async registroEmailContrasena(
    email: string,
    password: string,
    nombre: string,
    apellidos: string
  ): Promise<Usuario | null> {
    try {
      const usuarioAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const usuario = {
        uid: usuarioAuth.user.uid,
        mail: email,
        nombre: nombre,
        apellidos: apellidos,
      };

      await this.userDatabase.crearUsuario(usuario);

      this.setUser(usuario);

      guardarUsuarioStorage(usuario);

      this.toast.success(
        '¡Ya eres miembro!',
        'El registro en Ultimate BFF se ha realizado con éxito'
      );

      return usuario;
    } catch (error: any) {
      if (Object.values(error).includes(ERRORES_FIREBASE.email_en_uso)) {
        this.toast.error(
          'Email en uso',
          'El e-mail proporcionado ya está en uso en Ultimate BFF'
        );
        return null;
      } else {
        this.toast.error(
          'Error inesperado',
          'Ha ocurrido un error inesperado al crear la cuenta'
        );
        return null;
      }
    }
  }

  //función para el login con email y contraseña
  async loginEmailContrasena(
    email: string,
    password: string
  ): Promise<Usuario | null> {
    try {
      const usuarioAuth = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const usuario = await this.userDatabase.obtenerUsuario(
        usuarioAuth.user.uid
      );

      if (usuario === null) {
        this.toast.error(
          'Error inesperado',
          'Ha ocurrido un error al obtener los datos de tu usuario'
        );
        return null;
      }

      this.setUser(usuario);

      guardarUsuarioStorage(usuario);

      await this.inicializarUsuario()

      this.toast.success(
        'Sesión iniciada',
        'La sesión se ha iniciado con éxito'
      );

      return usuario;
    } catch (error: any) {
      if (
        Object.values(error).includes(ERRORES_FIREBASE.contrasena_incorrecta)
      ) {
        this.toast.error(
          'Contraseña incorrecta',
          'La contraseña introducida es incorrecta'
        );
        return null;
      } else if (Object.values(error).includes(ERRORES_FIREBASE.many_request)) {
        this.toast.error(
          'Suspensión temporal',
          'Cuenta suspendida temporalmente por demasiados intentos incorrectos'
        );
        return null;
      } else if (
        Object.values(error).includes(ERRORES_FIREBASE.usuario_inexistente)
      ) {
        this.toast.error(
          'Correo desconocido',
          'No existe una cuenta con este email'
        );
        return null;
      } else if (
        Object.values(error).includes(ERRORES_FIREBASE.credenciales_incorrectas)
      ) {
        this.toast.error(
          'Correo o contraseña incorrecta',
          'El correo o la contraseña proporcionados no son correctos'
        );
        return null;
      } else {
        this.toast.error('Error desconocido', 'Error al realizar el login');
        return null;
      }
    }
  }

  //Login y registro con Google
  async loginGoogle(): Promise<Usuario | null> {
    try {
      const provider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(auth, provider);
      const usuario = await this.userDatabase.obtenerUsuario(
        credentials.user.uid
      );

      if (usuario === null) {
        const userCreate:Usuario = {
          uid: credentials.user.uid,
          mail: credentials.user.email!,
          nombre: credentials.user.email!.split('@')[0],
          apellidos: ''
        }
        await this.userDatabase.crearUsuario(userCreate);

        this.setUser(userCreate);

        guardarUsuarioStorage(userCreate);

        await this.inicializarUsuario()

        this.toast.success(
          'Sesión iniciada',
          'La sesión se ha iniciado con éxito'
        );

        return userCreate
      }

      this.setUser(usuario);

      guardarUsuarioStorage(usuario);

      await this.inicializarUsuario()

      this.toast.success(
        'Sesión iniciada',
        'La sesión se ha iniciado con éxito'
      );

      return usuario;
    } catch (error) {
      this.toast.error(
        'Error inesperado',
        'Ha ocurrido un error al iniciar sesión'
      );
      return null;
    }
  }

  async desloguearUsuario(): Promise<void> {
    await signOut(auth)
      .then(() => {
        eliminarUsuarioStorage();
        this.setUser(null);
        this.proyectoService.setProyectos([])
        this.toast.success(
          'Usuario deslogueado',
          'Usuario deslogueado con éxito'
        );

        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.toast.error('Error', 'Error al desloguear al usuario');
      });
  }

  async editarUsuario(nombre:string, apellidos:string){
    try {
      const usuarioEditado = await this.userDatabase.editarUsuario(
        this.user?.uid!,
        nombre,
        apellidos
      ) 

      if (usuarioEditado === null){
        this.toast.error('Ha ocurrido un error', 'Error al actualizar la información del usuario usuario');
        return
      }
  
      this.setUser(usuarioEditado)
      guardarUsuarioStorage(usuarioEditado)

      this.toast.success('Información actualizada', 'La información de tu usuario se ha actualizado correctamente')

    } catch (error) {
      this.toast.error('Ha ocurrido un error', 'Error al actualizar la información del usuario usuario');
    }
  }

  async inicializarUsuario(){
    await this.proyectoService.obtenerProyectosUsuario(this.user?.uid!)
  }

  async obtenerUsuarioPorId(id:string){
    return await this.userDatabase.obtenerUsuario(id) as Usuario;
  }
}
