import { Revisores } from "./endpoint.model"

export interface Carpeta {
    id?:string
    idProyecto: string
    endpoints: string[]
    nombre: string
}

export interface CarpetaValue {
    name:string
    value:string
}

export interface CarpetaConEndpoints {
    id:string
    idProyecto: string
    endpoints: EndpointCarpeta[]
    nombre: string
}

export interface EndpointCarpeta {
    id:string
    idProyecto:string
    metodo: 'POST' | 'GET'| 'PUT' | 'DELETE'| 'HEAD' | 'PATCH'
    nombre:string
    revisores?:Revisores[]
}