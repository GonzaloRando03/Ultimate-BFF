export interface EndpointGenerico {
    id?:string
    metodo: 'POST' | 'GET'| 'PUT' | 'DELETE'| 'HEAD' | 'PATCH'
    requestBody: RequestBody
    requestParams: RequestParam[]
    url:string
    nombre:string
    idProyecto:string
    consultaDB:string
    response: EndpointResponse
    descripcion?:string
}

export interface EndpointPantalla {
    id?:string
    metodo: 'POST' | 'GET'| 'PUT' | 'DELETE'| 'HEAD' | 'PATCH'
    requestBody: RequestBody
    requestParams: RequestParam[]
    url:string
    nombre:string
    idProyecto:string
    response: EndpointResponse
    idEndpointGenerico: string
    descripcion?:string
}

export interface ComponenteVisual {
    id?:string
    idProyecto:string
    nombre:string
    componentes: Visual[]
}

export interface Visual {
    image:string,
    descripcion?:string,
    llamadas: LlamadaEndpoint[]
}

export interface LlamadaEndpoint {
    nombre:string,
    idEndpoint:string,
}

export type RequestBody = ObjectCell[]
export type EndpointResponse = ObjectCell[]

export interface ObjectCell {
    type: 'String' | 'Number' | 'Boolean' | 'Null' | 'Object' | 'Array' | 'Date'
    nombre: string
    content?: string | ObjectCell[]
}

export interface RequestParam {
    type: 'String' | 'Number' | 'Boolean' | 'Null' | 'Date'
    nombre: string
}