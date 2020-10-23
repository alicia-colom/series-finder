'use strict';

// [] 1.- eliminar FAVs clicando sobre ellas
//   [] 1.2.- incluir boton para eliminar FAVs
//   [] 1.3.- event.currentTarget en el boton de eliminar las pelis de favoritos
// 	 [] 1.4.- s queda pillada la FavList con un único elemento
// 	 [] 1.5.- localStorage de FAVs
// [] 2.- si no hay favoritos, mostrar el texto "no tienes favoritos"
// [] 3.- boton RESET en búsqueda --> que borre las series que aparecen en TU BUSQUEDA


////////////////

// ARRAYS PARA OPERAR:
let searchArray = [];
let favArray = [];

// OBJETOS CONSTRUCTORES PARA OPERAR:
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
const resetBtnSearch = document.querySelector('.js-searchReset');
const warningSearch = document.querySelector('.js-searchWarning');

// FUNCION PARA ENVÍO DE DATOS AL API:
function handleSearch() {
	searchArray = [];
	const textSearch = textAreaSearch.value;
	if (!textSearch) {
		warningSearch.classList.remove('hidden');
	} else {
		warningSearch.classList.add('hidden');
		resetBtnSearch.classList.remove('hidden');
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
}

// FUNCION PARA COMPROBAR SI EXISTE IMAGE.MEDIUM EN LA API:
function existMediumImg(photo) {
	if (photo !== null && photo.medium !== null) {
		return photo.medium;
	} else {
		return '//via.placeholder.com/210x295/e65027/800080/?text=¿?';
		//'../../assets/images/carta_ajuste.png';
	}
}

const containerSearch = document.querySelector('.js-searchList');

// FUNCION PARA PINTAR BÚSQUEDA EN HTML:
function paintSearch() {
	let liSearch = '';
	liSearch += `<h2 class="searchList__title">Tu búsqueda</h2>`;
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

// FUNCIÓN PARA MANEJAR FAVORITOS:
function handleFav(event) {
	const idSearch = event.currentTarget.dataset.id;
	const titleSearch = event.currentTarget.querySelector('.js-searchItemTitle');
	const imgSearch = event.currentTarget.querySelector('.js-searchItemImg');
	if (event.currentTarget.classList.contains('addFav')) {
		event.currentTarget.classList.remove('addFav');
		favArray = favArray.filter(
			(eachFavItem) => eachFavItem.showId !== idSearch
		);
		paintFav();
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
		paintFav();
	}
}

const containerFav = document.querySelector('.js-favList');

// FUNCION PARA PINTAR FAVORITOS EN HTML:
function paintFav() {
	let liFav = '';
	for (let i = 0; i < favArray.length; i++) {
		liFav += `<li class="js-favItem favList__favItem" data-id="${favArray[i].showId}">`;
		liFav += `<h3 class="js-favItemTitle favList__favItem--title">${favArray[i].showName}</h3>`;
		liFav += `<img class="js-favItemImg favList__favItem--img" src="${favArray[i].showImage}" alt="Imagen del cartel de ${favArray[i].showAlt}" title="Cartel de ${favArray[i].showTitle}"/>`;
		liFav += `</li>`;
		containerFav.innerHTML = liFav;
	}
}

// MEJORA:  FUNCION PARA AVISAR DE FAVORITOS VACÍO:
// const emptySearch = document.querySelector('.js-favListEmpty');
// const adviceSearch = document.querySelector('.js-favListAdvice');
// function emptyFav() {
// 	if (liFav.length < 1) {
// 		console.log('entro en IF para quiter texto de favorito vacio');
// 		emptySearch.classList.remove('hidden');
// 		adviceSearch.classList.remove('hidden');
// 	} else {
// 		emptySearch.classList.add('hidden');
// 		adviceSearch.classList.add('hidden');
// 	}
// }
// emptyFav();
