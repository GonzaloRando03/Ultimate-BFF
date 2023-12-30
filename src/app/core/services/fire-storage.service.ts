import { Injectable } from '@angular/core';
import { getStorage } from 'firebase/storage';
import { app } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  projectPath = ''

  constructor(private storage: AngularFireStorage) {}

  uploadImage(imagen:string, idProyecto:string) {
    return new Promise<string>((resolve, reject) => {
      //En caso de edición la imagen ya está subida, por lo que no debemos subirla otra vez
      if (imagen.includes('https://firebasestorage')){
        resolve(imagen) 
        return
      }

      const imageExtension = imagen.split(';')[0].split('/')[1];
      const filePath = `componentesVisuales/${new Date().getTime()}_${idProyecto}.${imageExtension}`;
      const imagenSrc = imagen.split('base64,')[1];
      const storageRef = this.storage.ref(filePath);
  
      const uploadTask = this.storage.upload(filePath, this.dataURItoBlob(imagenSrc, imageExtension));
  
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(
            downloadURL => resolve(downloadURL),
            error => reject(error)
          );
        })
      ).subscribe();
    });

  }

  dataURItoBlob(dataURI: string, imageExtension:string): Blob {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: 'image/' + imageExtension });
  }

 /*  async uploadImage(imagen:string, idProyecto:string): Promise<string> {
    const bucket = admin.storage().bucket();

    const imageExtension = imagen.split(';')[0].split('/')[1]
    const filePath = 'componentesVisuales/';
    const fileName = `${new Date().getTime()}_${idProyecto}.${imageExtension}`

    const imagenSrc = Buffer.from(imagen.split('base64,')[1], 'base64')
    const archivo = bucket.file(filePath + fileName)

    archivo.save(imagenSrc)

    const url = this.projectPath + filePath + '%2F' + fileName + '?alt=media'

    return url
  } */
}
