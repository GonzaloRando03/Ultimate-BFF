import jsPDF from "jspdf";
import { 
    ComponenteVisual, 
    EndpointGenerico, 
    EndpointPantalla, 
    ObjectCell
} from "src/app/core/models/endpoint.model";
import { Proyecto } from "src/app/core/models/proyecto.model";

const H1SIZE = 20
const H2SIZE = 18
const H3SIZE = 16
const H4SIZE = 14
const H5SIZE = 12
const NORMALSIZE = 12

const NORMALCOLOR = {
    r: 25,
    g: 26,
    b: 28
}

const PRIMARYCOLOR = {
    r: 32,
    g: 87,
    b: 197
}

export function generarBFFtoPDF(
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

    pdf.save('DocumentaciónBFF_' + proyecto.nombre + '.pdf')
}

function addh1(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H1SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

function addh2(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H2SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

function addh3(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H3SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

function addh4(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H4SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

function addh5(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H5SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

function addText(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(NORMALSIZE);
    pdf.setTextColor(NORMALCOLOR.r, NORMALCOLOR.g, NORMALCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

function addTextLong(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(NORMALSIZE);
    pdf.setTextColor(NORMALCOLOR.r, NORMALCOLOR.g, NORMALCOLOR.b)

    const maxWidth = 150;
    // Divide el texto en líneas
    const textLines = pdf.splitTextToSize(text, maxWidth);

    // Establece la posición inicial
    let yPosition = siguienteLinea;

    // Agrega cada línea al PDF
    textLines.forEach((line:any) => {
        pdf.text(line, 20, yPosition);
        yPosition = saltoObjeto(pdf, yPosition)
    });
    
    return yPosition
}

function addObjectPDF(pdf:jsPDF, objects:ObjectCell[], siguienteLinea:number, positionLeft:number){
    pdf.setFontSize(NORMALSIZE);
    pdf.setTextColor(NORMALCOLOR.r, NORMALCOLOR.g, NORMALCOLOR.b)
    pdf.text('{', positionLeft, siguienteLinea);
    siguienteLinea = saltoObjeto(pdf, siguienteLinea)
    siguienteLinea = addObjectValuesPDF(pdf, objects, siguienteLinea, positionLeft + 5)
    pdf.text('}', positionLeft, siguienteLinea);
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    return siguienteLinea
}

function addObjectValuesPDF(pdf:jsPDF, objects:ObjectCell[], siguienteLinea:number, positionLeft:number){
    objects.forEach(o => {
        if (o.type === 'Object'){
            pdf.text(o.nombre + ': {', positionLeft, siguienteLinea);
            siguienteLinea = saltoObjeto(pdf, siguienteLinea)
            siguienteLinea = addObjectValuesPDF(pdf, o.content as ObjectCell[], siguienteLinea, positionLeft + 5)
            pdf.text('}', positionLeft, siguienteLinea);
            siguienteLinea = saltoObjeto(pdf, siguienteLinea)
        
        } else if (o.type === 'Array' && typeof o.content !== 'string'){
            pdf.text(o.nombre + ': [{', positionLeft, siguienteLinea);
            siguienteLinea = saltoObjeto(pdf, siguienteLinea)
            siguienteLinea = addObjectValuesPDF(pdf, o.content as ObjectCell[], siguienteLinea, positionLeft + 5)
            pdf.text('}]', positionLeft, siguienteLinea);
            siguienteLinea = saltoObjeto(pdf, siguienteLinea)
        
        } else if (o.type === 'Array' && typeof o.content === 'string'){
            pdf.text(o.nombre + ': ' + o.content + '[ ]', positionLeft, siguienteLinea);
            siguienteLinea = saltoObjeto(pdf, siguienteLinea)
        
        } else {
            pdf.text(o.nombre + ': ' + o.type, positionLeft, siguienteLinea);
            siguienteLinea = saltoObjeto(pdf, siguienteLinea)
        }
    })

    return siguienteLinea
}

function addMethod(pdf:jsPDF, text:string, metodo:string, siguienteLinea:number){
    pdf.setFontSize(H4SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea)
    pdf.setFontSize(NORMALSIZE);
    pdf.setTextColor(NORMALCOLOR.r, NORMALCOLOR.g, NORMALCOLOR.b)
    pdf.text(metodo, 55, siguienteLinea)
}

function saltoObjeto(pdf:jsPDF, l:number){
    l += 7
    const pageHeight = pdf.internal.pageSize.height - 20;
    if (l >= pageHeight){
        pdf.addPage()
        l = 20
        return l
    }

    return l
}

function pasarDeLinea(pdf:jsPDF, l:number){
    l += 10
    const pageHeight = pdf.internal.pageSize.height - 20;
    if (l >= pageHeight){
        pdf.addPage()
        l = 20
        return l
    }

    return l
}

function saltoDeLinea(pdf:jsPDF, l:number){
    l += 15
    const pageHeight = pdf.internal.pageSize.height - 20;
    if (l >= pageHeight){
        pdf.addPage()
        l = 20
        return l
    }

    return l
}