import jsPDF from "jspdf";
import { 
    ComponenteVisual, 
    EndpointGenerico, 
    EndpointPantalla 
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
    siguienteLinea = saltoDeLinea(siguienteLinea)

    //Endpoints genéricos
    addh2(pdf, '1 - Endpoints Genéricos', siguienteLinea)
    siguienteLinea = pasarDeLinea(siguienteLinea)

    let contadorGenericos = 1
    genericos.forEach(g => {
        addh3(pdf, '1.' + contadorGenericos + ' - ' + g.nombre, siguienteLinea)
        siguienteLinea = pasarDeLinea(siguienteLinea)

        addMethod(pdf, '1.' + contadorGenericos + '.1 - Método:', g.metodo, siguienteLinea)
        siguienteLinea = pasarDeLinea(siguienteLinea)

        if (g.descripcion){
            addh4(pdf, '1.' + contadorGenericos + '.2 - Descripción', siguienteLinea)
            siguienteLinea = pasarDeLinea(siguienteLinea)
            siguienteLinea = addTextLong(pdf, g.descripcion, siguienteLinea)
            siguienteLinea = pasarDeLinea(siguienteLinea)
        }
        
        addText(pdf, 'Texto de prueba', siguienteLinea)
    })

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
        yPosition += 7;
    });
    
    return yPosition
}

function addMethod(pdf:jsPDF, text:string, metodo:string, siguienteLinea:number){
    pdf.setFontSize(H4SIZE);
    pdf.setTextColor(PRIMARYCOLOR.r, PRIMARYCOLOR.g, PRIMARYCOLOR.b)
    pdf.text(text, 20, siguienteLinea)
    pdf.setFontSize(NORMALSIZE);
    pdf.setTextColor(NORMALCOLOR.r, NORMALCOLOR.g, NORMALCOLOR.b)
    pdf.text(metodo, 55, siguienteLinea)
}

function pasarDeLinea(l:number){
    return l + 10
}

function saltoDeLinea(l:number){
    return l + 15
}