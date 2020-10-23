'use strict';

// [] 1.- crear objeto tipo para trabajar con los datos
// [] 2.- Leer el input.value del campo textArea
// []   2.1.- recoger ese string en una constante  ***revisar *FUNCION PARA ENVÍO DE DATOS AL API* más abajo
// []   2.2.-
// [] 3.- Evento escuchador-->boton Search  +  handle-->llamada a API
// [] 4.- fetch al API (http://api.tvmaze.com/search/shows?q=)
// []   4.1.- .then con response.json
// [] 5.- event.currentTarget en el boton de eliminar las pelis de favoritos
// [] 6.- si no hay favoritos, mostrar el texto "no tienes favoritos"

////////////////

// OBJETOS PARA OPERAR:
// const dataAPIList = [
//   {
//     show = {
//     name: "nombre serie",
//     image = {   // PUEDE SER NULL --> tendría que implementear un IF
//       medium: "url",
//     }
//   }
// }
// ];

// ARRAYS PARA OPERAR:
let searchList = [];
let favList = [];

function searchItem(nombre, imagen) {
	this.showName = nombre; // = dataAPI.show.name
	this.showImage = imagen; // = dataAPI.show.image.medium
}

// const xxx = new searchItem(dataAPI.show.name, dataAPI.show.image.medium)

function favItem(nombre, imagen) {
	this.showName = nombre;
	this.showImage = imagen;
}

const btnSearch = document.querySelector('.js-btnSearch');
const textAreaSearch = document.querySelector('.js-textAreaSearch');

// FUNCION PARA ENVÍO DE DATOS AL API:
function handleSendSearch() {
	console.log('entro en la función');

	const textSearch = textAreaSearch.value;
	fetch(`//api.tvmaze.com/search/shows?q=${textSearch}`)
		.then((response) => response.json())
		.then((dataAPIList) => {
			// for del array que me devuelve la API
			// --> extraer los campos que quiero
			//     -->
			for (let i = 0; i < dataAPIList.length; i++) {
				console.log('item', dataAPIList[i]);

				const nameFromAPI = dataAPIList[i].show.name;
				const imgFromAPI = dataAPIList[i].show.image.medium;
				console.log('esto es el nombre', nameFromAPI);
				console.log('esto es la imagen', imgFromAPI);
			}
		});
}

// EVENTO CLICK EN SEARCH:
btnSearch.addEventListener('click', handleSendSearch);

// SIMULAR EL CLICK DEL USUARIO
btnSearch.click();
