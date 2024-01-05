import jsPDF from "jspdf";
import { 
    ComponenteVisual, 
    EndpointGenerico, 
    EndpointPantalla, 
} from "src/app/core/models/endpoint.model";
import { Proyecto } from "src/app/core/models/proyecto.model";
import { 
    addImage, addMethod, addObjectPDF, addText, 
    addTextLong, addh1, addh2, addh3, addh4, 
    getGenerico, getPantallas, pasarDeLinea, saltoDeLinea 
} from "./pdfUtils";


export async function generarBFFtoPDF(
    proyecto:Proyecto,
    genericos:EndpointGenerico[], 
    pantallas:EndpointPantalla[], 
    visuales:ComponenteVisual[]
){
    let siguienteLinea = 20

    const pdf = new jsPDF();

    // Título principal
    addh1(pdf, 'Documentación BFF de ' + proyecto.nombre, siguienteLinea)
    siguienteLinea = saltoDeLinea(pdf, siguienteLinea)

    //Endpoints genéricos
    addh2(pdf, '1 - Endpoints Genéricos', siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

    let contadorGenericos = 1
    genericos.forEach(g => {
        addh3(pdf, '1.' + contadorGenericos + ' - ' + g.nombre, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

        addh4(pdf, '1.' + contadorGenericos + '.1 - Ruta', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        addText(pdf, g.url, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

        addMethod(pdf, '1.' + contadorGenericos + '.2 - Método:', g.metodo, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

        addh4(pdf, '1.' + contadorGenericos + '.3 - Descripción', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        if (g.descripcion){
            siguienteLinea = addTextLong(pdf, g.descripcion, siguienteLinea)
            siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        }
        
        addh4(pdf, '1.' + contadorGenericos + '.4 - Request params', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        if (g.requestParams){
            siguienteLinea = addObjectPDF(pdf, g.requestParams, siguienteLinea, 20)
        }

        addh4(pdf, '1.' + contadorGenericos + '.5 - Request body', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        if (g.requestBody){
            siguienteLinea = addObjectPDF(pdf, g.requestBody, siguienteLinea, 20)
        }

        addh4(pdf, '1.' + contadorGenericos + '.6 - Response', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        siguienteLinea = addObjectPDF(pdf, g.response, siguienteLinea, 20)
        
        addh4(pdf, '1.' + contadorGenericos + '.7 - Consulta de base de datos', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        if (g.consultaDB){
            siguienteLinea = addTextLong(pdf, g.consultaDB, siguienteLinea)
            siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        }

        contadorGenericos++
    })

    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

    //Endpoints de pantalla
    addh2(pdf, '2 - Endpoints de Pantalla', siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

    let contadorPantalla = 1
    pantallas.forEach(g => {
        addh3(pdf, '2.' + contadorPantalla + ' - ' + g.nombre, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

        addh4(pdf, '2.' + contadorPantalla + '.1 - Ruta', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        addText(pdf, g.url, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

        addMethod(pdf, '2.' + contadorPantalla + '.2 - Método:', g.metodo, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

        addh4(pdf, '2.' + contadorPantalla + '.3 - Endpoint Genérico', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        addText(pdf, g.nombre + ' usa el endpoint genérico: ' + getGenerico(g.idEndpointGenerico,genericos)?.nombre, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

        addh4(pdf, '2.' + contadorPantalla + '.3 - Descripción', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        if (g.descripcion){
            siguienteLinea = addTextLong(pdf, g.descripcion, siguienteLinea)
            siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        }
        
        addh4(pdf, '2.' + contadorPantalla + '.4 - Request params', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        if (g.requestParams){
            siguienteLinea = addObjectPDF(pdf, g.requestParams, siguienteLinea, 20)
        }

        addh4(pdf, '2.' + contadorPantalla + '.5 - Request body', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        if (g.requestBody){
            siguienteLinea = addObjectPDF(pdf, g.requestBody, siguienteLinea, 20)
        }

        addh4(pdf, '2.' + contadorPantalla + '.6 - Response', siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
        siguienteLinea = addObjectPDF(pdf, g.response, siguienteLinea, 20)

        contadorPantalla++
    })

    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

    //Componentes Visuales
    addh2(pdf, '3 - Componentes Visuales', siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

    let contadorVisuales = 1


    for (let g of visuales){
        addh3(pdf, '3.' + contadorVisuales + ' - ' + g.nombre, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

        for (let c of g.componentes){
            siguienteLinea = await addImage(pdf, c.image, siguienteLinea)
            siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

            addh4(pdf, 'Descripción', siguienteLinea)
            siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
            if (c.descripcion){
                siguienteLinea = addTextLong(pdf, c.descripcion, siguienteLinea)
                siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
            }
            addh4(pdf, 'Llamadas', siguienteLinea)
            siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
            c.llamadas.forEach(l => {
                addText(pdf,l.nombre + ': ' + getPantallas(l.idEndpoint, pantallas)!.nombre, siguienteLinea)
                siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
            })
        }

        contadorVisuales++
    }

    pdf.save('DocumentaciónBFF_' + proyecto.nombre + '.pdf')
}

export async function generarGenericoToPDF(
  generico:EndpointGenerico, 
){
    let siguienteLinea = 20

    const pdf = new jsPDF();

    // Título principal
    addh1(pdf, '1 - Endpoint Genérico' + generico.nombre, siguienteLinea)
    siguienteLinea = saltoDeLinea(pdf, siguienteLinea)

    addh4(pdf, '1.1 - Ruta', siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    addText(pdf, generico.url, siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

    addMethod(pdf, '1.2 - Método:', generico.metodo, siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

    addh4(pdf, '1.3 - Descripción', siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    if (generico.descripcion){
        siguienteLinea = addTextLong(pdf, generico.descripcion, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    }
    
    addh4(pdf, '1.4 - Request params', siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    if (generico.requestParams){
        siguienteLinea = addObjectPDF(pdf, generico.requestParams, siguienteLinea, 20)
    }

    addh4(pdf, '1.5 - Request body', siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    if (generico.requestBody){
        siguienteLinea = addObjectPDF(pdf, generico.requestBody, siguienteLinea, 20)
    }

    addh4(pdf, '1.6 - Response', siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    siguienteLinea = addObjectPDF(pdf, generico.response, siguienteLinea, 20)
    
    addh4(pdf, '1.7 - Consulta de base de datos', siguienteLinea)
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    if (generico.consultaDB){
        siguienteLinea = addTextLong(pdf, generico.consultaDB, siguienteLinea)
        siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    }

    pdf.save('DocumentaciónBFF_EndpointGenérico_' + generico.nombre + '.pdf')
}

export async function generarPantallaToPDF(
    pantalla:EndpointPantalla, 
  ){
      let siguienteLinea = 20
  
      const pdf = new jsPDF();
  
      // Título principal
      addh1(pdf, '1 - Endpoint Pantalla' + pantalla.nombre, siguienteLinea)
      siguienteLinea = saltoDeLinea(pdf, siguienteLinea)
  
      addh4(pdf, '1.1 - Ruta', siguienteLinea)
      siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
      addText(pdf, pantalla.url, siguienteLinea)
      siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

      addMethod(pdf, '1.2 - Método:', pantalla.metodo, siguienteLinea)
      siguienteLinea = pasarDeLinea(pdf, siguienteLinea)

      addh4(pdf, '1.3 - Descripción', siguienteLinea)
      siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
      if (pantalla.descripcion){
          siguienteLinea = addTextLong(pdf, pantalla.descripcion, siguienteLinea)
          siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
      }
      
      addh4(pdf, '1.4 - Request params', siguienteLinea)
      siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
      if (pantalla.requestParams){
          siguienteLinea = addObjectPDF(pdf, pantalla.requestParams, siguienteLinea, 20)
      }

      addh4(pdf, '1.5 - Request body', siguienteLinea)
      siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
      if (pantalla.requestBody){
          siguienteLinea = addObjectPDF(pdf, pantalla.requestBody, siguienteLinea, 20)
      }

      addh4(pdf, '1.6 - Response', siguienteLinea)
      siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
      siguienteLinea = addObjectPDF(pdf, pantalla.response, siguienteLinea, 20)
  
      pdf.save('DocumentaciónBFF_EndpointPantalla_' + pantalla.nombre + '.pdf')
  }