import { Usuario } from 'src/app/core/models/usuario.model';

const CLAVE_USER = 'userstoragebff';

//función para guardar un usuario en el localstorage
export function guardarUsuarioStorage(user: Usuario): void {
  localStorage.setItem(CLAVE_USER, JSON.stringify(user));
}

//getter para usuario en el localstorage
export function getUsuarioStorage(): Usuario | null {
  const userStorage = localStorage.getItem(CLAVE_USER);
  if (userStorage) return JSON.parse(userStorage) as Usuario;
  return null;
}

//función para eliminar un usuario en el localstorage
export function eliminarUsuarioStorage(): void {
  localStorage.removeItem(CLAVE_USER);
}
