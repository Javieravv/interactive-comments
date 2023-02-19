// Realizamos operacioes con la data.

// Función para mostrar la diferencia entre dos fechas
export const difDiasDate = (date1, date2) => {
    let fecha1 = new Date (date1)
    let fecha2 = new Date (date2)
    let diferencia = fecha2.getTime() - fecha1.getTime()
    let diasDiferencia = diferencia /1000 / 60 / 60 / 24
    return diasDiferencia
}

export const textDiasDate = (date1, date2) => {
    const diasDiferencia = difDiasDate(date1, date2)
    let textDateTemp = ""
    switch (true) {
        case diasDiferencia < 1:
            textDateTemp = new Date (date1).toDateString();
            break;
        case ((diasDiferencia > 1) && (diasDiferencia <= 7)):
            textDateTemp = `${diasDiferencia.toFixed(0)} days ago`;
            break;
        case ((diasDiferencia > 7) && (diasDiferencia <= 30)):
            textDateTemp = `${ Math.round( diasDiferencia / 7 ) } weeks ago`;
            break;
        case ((diasDiferencia > 30) && (diasDiferencia <= 365)):
            textDateTemp = `${ Math.round( diasDiferencia / 30 ) } months ago`;
            break;
        case diasDiferencia > 365:
            textDateTemp = `${ Math.round( diasDiferencia / 365 ) } years ago`;
            break;
        default:
            textDateTemp = diasDiferencia.toFixed(0).toString();
    }
    return textDateTemp
}