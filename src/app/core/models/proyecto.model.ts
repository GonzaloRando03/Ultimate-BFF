import { Timestamp } from "firebase/firestore"

export interface Proyecto {
    id?:string
    nombre:string
    propietario:string
    fechaCreacion: Date | Timestamp
    usuarios:string[]
    numeroGenericos?:number
    numeroPantallas?:number
}