import jsPDF from "jspdf";
import { EndpointGenerico, EndpointPantalla, ObjectCell } from "src/app/core/models/endpoint.model";

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

export function addh1(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H1SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

export function addh2(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H2SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

export function addh3(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H3SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

export function addh4(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H4SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

export function addh5(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(H5SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

export function addText(pdf:jsPDF, text:string, siguienteLinea:number){
    pdf.setFontSize(NORMALSIZE);
    pdf.setTextColor(NORMALCOLOR.r, NORMALCOLOR.g, NORMALCOLOR.b)
    pdf.text(text, 20, siguienteLinea);
}

export function nuevaPagina(pdf:jsPDF){
    pdf.addPage()
    return 20
}

export function addTextLong(pdf:jsPDF, text:string, siguienteLinea:number){
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
    
    return yPosition - 5
}

export function addObjectPDF(pdf:jsPDF, objects:ObjectCell[], siguienteLinea:number, positionLeft:number){
    pdf.setFontSize(NORMALSIZE);
    pdf.setTextColor(NORMALCOLOR.r, NORMALCOLOR.g, NORMALCOLOR.b)
    pdf.text('{', positionLeft, siguienteLinea);
    siguienteLinea = saltoObjeto(pdf, siguienteLinea)
    siguienteLinea = addObjectValuesPDF(pdf, objects, siguienteLinea, positionLeft + 5)
    pdf.text('}', positionLeft, siguienteLinea);
    siguienteLinea = pasarDeLinea(pdf, siguienteLinea)
    return siguienteLinea
}

export function addObjectValuesPDF(pdf:jsPDF, objects:ObjectCell[], siguienteLinea:number, positionLeft:number){
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

export async function addImage(pdf:jsPDF, uri:string, siguienteLinea:number){
    const blob = await urlToBlob(uri)
    const imagen = await blobToBase64(blob) as string

    const imagenSrc = imagen.split('base64,')[1];
    const uriArray = uri.split('?')[0].split('.')
    const imageFormat = uriArray[uriArray.length - 1].toLocaleUpperCase()
    // Añade la imagen al PDF
    const imageProperties = pdf.getImageProperties(imagenSrc);
    const scale = 150 / imageProperties.width;
    const imageWidth = imageProperties.width * scale;
    const imageHeight = imageProperties.height * scale;

    const pageHeight = pdf.internal.pageSize.height - 20;
    if (siguienteLinea + imageHeight >= pageHeight){
        pdf.addPage()
        siguienteLinea = 20
    }
    pdf.addImage(imagenSrc, imageFormat!,20, siguienteLinea, imageWidth, imageHeight);          

    return siguienteLinea + imageHeight
}

export function addMethod(pdf:jsPDF, text:string, metodo:string, siguienteLinea:number){
    pdf.setFontSize(H4SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea)
    pdf.setFontSize(NORMALSIZE);
    pdf.setTextColor(NORMALCOLOR.r, NORMALCOLOR.g, NORMALCOLOR.b)
    pdf.text(metodo, 55, siguienteLinea)
}

export function saltoObjeto(pdf:jsPDF, l:number){
    l += 7
    const pageHeight = pdf.internal.pageSize.height - 20;
    if (l >= pageHeight){
        pdf.addPage()
        l = 20
        return l
    }

    return l
}

export function pasarDeLinea(pdf:jsPDF, l:number){
    l += 10
    const pageHeight = pdf.internal.pageSize.height - 20;
    if (l >= pageHeight){
        pdf.addPage()
        l = 20
        return l
    }

    return l
}

export function saltoDeLinea(pdf:jsPDF, l:number){
    l += 15
    const pageHeight = pdf.internal.pageSize.height - 20;
    if (l >= pageHeight){
        pdf.addPage()
        l = 20
        return l
    }

    return l
}

export function getGenerico(id:string, genericos:EndpointGenerico[]){
    return genericos.find(g => g.id === id)
}

export function getPantallas(id:string, pantallas:EndpointPantalla[]){
    return pantallas.find(g => g.id === id)
}
  

export function urlToBlob(url:string) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.onerror = reject;

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const blobVariable = xhr.response;
                resolve(blobVariable);
            }
        };

        xhr.open('GET', url);
        xhr.responseType = 'blob'; // convert type
        xhr.send();
    });
}


export const blobToBase64 = (blob:any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };