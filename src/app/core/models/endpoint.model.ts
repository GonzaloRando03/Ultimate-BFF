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
}

export type RequestBody = ObjectCell[]
export type EndpointResponse = ObjectCell[]

export interface ObjectCell {
    type: 'String' | 'Number' | 'Boolean' | 'Null' | 'Object' | 'Array'
    nombre: string
    content?: string | ObjectCell[]
}

export interface RequestParam {
    type: 'String' | 'Number' | 'Boolean' | 'Null' 
    nombre: string
}