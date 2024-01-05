export function generarCSV(nombre:string, datos:DatosCSVRedmine[]) {
    // Datos que quieres incluir en el CSV
    const data = [
      ['Asunto', 'Descripción', 'Asignado a', 'Prioridad'],
    ];

    datos.forEach(d => {
        const row = [d.asunto, d.descripcion, d.asignado, 'Normal']
        data.push(row)
    })

    // Convertir los datos a formato CSV
    const csvContent = convertirAFormatoCSV(data);

    // Crear un Blob con el contenido CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Crear un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = nombre + '.csv';

    // Simular un clic en el enlace para iniciar la descarga
    link.click();
  }

function convertirAFormatoCSV(data: any[][]) {
    return data.map(row => row.join(',')).join('\n');
}

export interface DatosCSVRedmine {
    asunto: string,
    descripcion: string,
    asignado: string,
}