'use strict';

// [] 3.- boton RESET en búsqueda --> que aparezca cuando se haga la primera búsqueda
//        (añadiendo o quitando la clase HIDDEN con un IF)
// [] 4.- borrar búsqueda al realizar una búsqueda nueva
// [] 5.- event.currentTarget en el boton de eliminar las pelis de favoritos
// [] 6.- si no hay favoritos, mostrar el texto "no tienes favoritos"

////////////////

// ARRAYS PARA OPERAR:
let searchArray = [];
let favArray = [];

// OBJETOS PARA OPERAR:
function searchItem(id, name, img) {
	this.showId = id; // = dataAPI.show.id
	this.showName = name; // = dataAPI.show.name
	this.showImage = img; // = dataAPI.show.image.medium
}
function favItem(id, name, img, alt, title) {
	this.showId = id;
	this.showName = name;
	this.showImage = img;
	this.showAlt = alt;
	this.showTitle = title;
}

const btnSearch = document.querySelector('.js-searchBtn');
const textAreaSearch = document.querySelector('.js-searchTextArea');
const containerSearch = document.querySelector('.js-searchList');

// FUNCION PARA ENVÍO DE DATOS AL API:
function handleSearch() {
	searchArray = [];
	const textSearch = textAreaSearch.value;
	fetch(`//api.tvmaze.com/search/shows?q=${textSearch}`)
		.then((response) => response.json())
		.then((dataAPIList) => {
			for (let i = 0; i < dataAPIList.length; i++) {
				const idFromAPI = dataAPIList[i].show.id;
				const nameFromAPI = dataAPIList[i].show.name;
				const imgFromAPI = existMediumImg(dataAPIList[i].show.image);
				searchArray.push(new searchItem(idFromAPI, nameFromAPI, imgFromAPI));
			}
			paintSearch();
			addFavEvent();
		});
}

// FUNCION PARA COMPROBAR SI EXISTE IMAGE.MEDIUM EN LA API:
function existMediumImg(photo) {
	if (photo !== null && photo.medium !== null) {
		return photo.medium;
	}
}

// FUNCION PARA PINTAR BÚSQUEDA EN HTML:
function paintSearch() {
	let liSearch = '';
	for (let i = 0; i < searchArray.length; i++) {
		liSearch += `<li class="js-searchItem searchList__searchItem" data-id="${searchArray[i].showId}">`;
		liSearch += `<h3 class="js-searchItemTitle searchList__searchItem--title">${searchArray[i].showName}</h3>`;
		liSearch += `<img class="js-searchItemImg searchList__searchItem--img" src="${searchArray[i].showImage}" alt="Imagen del cartel de ${searchArray[i].showName}" title="Cartel de ${searchArray[i].showName}"/>`;
		liSearch += `</li>`;
		containerSearch.innerHTML = liSearch;
	}
}

// EVENTO CLICK EN SEARCH:
btnSearch.addEventListener('click', handleSearch);

// FUNCIÓN PARA AÑADIR EVENTO A CADA ITEM DE BÚSQUEDA:
function addFavEvent() {
	const listSearch = document.querySelectorAll('.js-searchItem');
	for (const eachSearchItem of listSearch) {
		eachSearchItem.addEventListener('click', handleFav);
	}
}

// FUNCIÓN PARA AÑADIR A FAV:
function handleFav(event) {
	const idSearch = event.currentTarget.dataset.id;
	const titleSearch = event.currentTarget.querySelector('.js-searchItemTitle');
	const imgSearch = event.currentTarget.querySelector('.js-searchItemImg');
	if (event.currentTarget.classList.contains('addFav')) {
		event.currentTarget.classList.remove('addFav');
		favArray = favArray.filter(
			(eachFavItem) => eachFavItem.showId !== idSearch
		);
	} else {
		event.currentTarget.classList.add('addFav');
		favArray.push(
			new favItem(
				idSearch,
				titleSearch.innerHTML,
				imgSearch.src,
				`Imagen del cartel de ${titleSearch.innerHTML}`,
				`Cartel de ${titleSearch.innerHTML}`
			)
		);
	}
}