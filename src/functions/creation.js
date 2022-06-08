const { Console } = require('console');
const fs = require('fs');
const { get } = require('http');
//Obteniendo el path
const path = require('path');
const dir_path = path.join(__dirname,'directory');

let date =  new Date().getFullYear();
//Obtener el año actual
var anio = getAnio(date);

var meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo",
    "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
];
//Creacion de carpetas anio
createFolderAnio(anio);
//Creacion de carpetas y archivos por mes
for(let j = 0; j<anio.length;j++){
    for(let i = 0; i< meses.length;i++){
        let aux_path = path.join(`${dir_path}/${anio[j]}`, meses[i]);
        if(!ifExists(aux_path)){
            fs.mkdir(aux_path, (err) => {
                if (err) {
                    return console.error(err);
                }
                else{
                    for(let k = 1; k <= daysInMonth(i+1,parseInt(anio[j]));k++){
                        fs.writeFile(`${dir_path}/${anio[j]}/${meses[i]}/${k}.txt`, 'node', (err) => {
                            if (err) throw err;
                            // console.log('File is created successfully.');
                        }
                        );
                    }
                }
                // console.log('Subdirectory created successfully!');
            });
        }
    }
}

//Obtiene los días correspondientes a un mes y su respectivo año
function daysInMonth(mes, anio) {
    return new Date(anio, mes, 0).getDate();
}
//Crea las carpetas por año
function createFolderAnio(anio){
    for(let i = 0; i< anio.length;i++){
        let aux_path = path.join(dir_path, anio[i]);
        if(!ifExists(aux_path)){
            fs.mkdir(aux_path, (err) => {
                if (err) {
                    return console.error(err);
                }
                // console.log('Directory created successfully!');
            });
        }
    }
}

//Obtiene los años desde el 2017 al año actual
function getAnio(date){
    var anio = [];
    for(let i = 2017; i <= date; i++){
        anio.push(i.toString());
    }
    return anio;
}
//Comprueba si el path dado ya existe
function ifExists(pathcito){
    fs.exists((pathcito), exists => {
        return !exists ? false : true;
    });
}