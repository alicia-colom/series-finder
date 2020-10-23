'use strict';

// [] 2.- Leer el input.value del campo textArea
// []   2.1.- recoger ese string en una constante
// [] 5.- event.currentTarget en el boton de eliminar las pelis de favoritos
// [] 6.- si no hay favoritos, mostrar el texto "no tienes favoritos"

////////////////

// ARRAYS PARA OPERAR:
let searchArray = [];
let favArray = [];

// OBJETOS PARA OPERAR:
function searchItem(name, img) {
	this.showName = name; // = dataAPI.show.name
	this.showImage = img; // = dataAPI.show.image.medium
}
function favItem(nombre, imagen) {
	this.showName = nombre;
	this.showImage = imagen;
}

const btnSearch = document.querySelector('.js-searchBtn');
const textAreaSearch = document.querySelector('.js-searchTextArea');
const containerSearch = document.querySelector('.js-searchList');
const titleSearch = document.querySelector('.js-searchItemTitle');
const imgSearch = document.querySelector('.js-searchItemImg');

// FUNCION PARA ENVÍO DE DATOS AL API:
function handleSearch() {
	const textSearch = textAreaSearch.value;
	fetch(`//api.tvmaze.com/search/shows?q=${textSearch}`)
		.then((response) => response.json())
		.then((dataAPIList) => {
			for (let i = 0; i < dataAPIList.length; i++) {
				const nameFromAPI = dataAPIList[i].show.name;
				const imgFromAPI = existMediumImg(dataAPIList[i].show.image);
				searchArray.push(new searchItem(nameFromAPI, imgFromAPI));
			}
			console.log('mi array', searchArray);

			// llamar a FUNCION para meter siguiente paso
			paint();
		});
}

function existMediumImg(photo) {
	if (photo !== null && photo.medium !== null) {
		return photo.medium;
	}
}

function paint() {
	let liSearch = '';
	for (let i = 0; i < searchArray.length; i++) {
		liSearch += `<li class="js-searchItem searchList__searchItem">`;
		liSearch += `<h3 class="js-searchItemTitle searchList__searchItem--title">${searchArray[i].showName}</h3>`;
		liSearch += `<img class="js-searchItemImg searchList__searchItem--img" src="${searchArray[i].showImage}" alt="Imagen del cartel de ${searchArray[i].showName}" title="Cartel de ${searchArray[i].showName}"/>`;
		liSearch += `</li>`;
		containerSearch.innerHTML = liSearch;
	}
}

// EVENTO CLICK EN SEARCH:
btnSearch.addEventListener('click', handleSearch);

// SIMULAR EL CLICK DEL USUARIO
// btnSearch.click();
