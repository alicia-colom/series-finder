'use strict';

// ARRAYS:
let searchArray = [];
let favArray = [];

// CONSTRUCTOR OBJETS:
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
const warningSearch = document.querySelector('.js-searchWarning');

// FUNCTION FOR SENDING DATA TO API:
function handleSearch() {
	searchArray = [];
	const textSearch = textAreaSearch.value;
	if (!textSearch) {
		warningSearch.classList.remove('hidden');
	} else {
		warningSearch.classList.add('hidden');
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

// FUNCTION TO CHECK IMAGE.MEDIUM FROM API:
function existMediumImg(photo) {
	if (photo !== null && photo.medium !== null) {
		return photo.medium;
	} else {
		return '//via.placeholder.com/210x295/de4242/282d4f/?text=CODEFLIX';
		//'../../assets/images/carta_ajuste.png';
	}
}

const mainSearch = document.querySelector('.js-searchMain');
const containerSearch = document.querySelector('.js-searchList');

// FUNCTION TO PAINT HTML SEARCH:
function paintSearch() {
	mainSearch.classList.remove('hide');
	let liSearch = '';
	for (let i = 0; i < searchArray.length; i++) {
		if (
			favArray.find((favElement) => favElement.showId === searchArray[i].showId)
		) {
			liSearch += `<li class="js-searchItem searchList__searchItem center addFav" data-id="${searchArray[i].showId}">`;
		} else {
			liSearch += `<li class="js-searchItem searchList__searchItem center" data-id="${searchArray[i].showId}">`;
		}
		liSearch += `<h3 class="js-searchItemTitle searchList__searchItem--title" href="#0">${searchArray[i].showName}</h3>`;
		liSearch += `<img class="js-searchItemImg searchList__searchItem--img" src="${searchArray[i].showImage}" alt="Imagen del cartel de ${searchArray[i].showName}" title="Cartel de ${searchArray[i].showName}"/>`;
		liSearch += `</li>`;
		containerSearch.innerHTML = liSearch;
	}
}

// EVENT CLICK ON SEARCH:
btnSearch.addEventListener('click', handleSearch);

// FUNCTION TO ADD EVENT TO EACH SEARCH ITEM:
function addFavEvent() {
	const listSearch = document.querySelectorAll('.js-searchItem');
	for (const eachSearchItem of listSearch) {
		eachSearchItem.addEventListener('click', handleFav);
	}
}

// FUNCTION TO OPERATE WITH FAVS:
function handleFav(event) {
	const idSearch = parseInt(event.currentTarget.dataset.id);
	const titleSearch = event.currentTarget.querySelector('.js-searchItemTitle');
	const imgSearch = event.currentTarget.querySelector('.js-searchItemImg');

	if (event.currentTarget.classList.contains('addFav')) {
		event.currentTarget.classList.remove('addFav');
		favArray = favArray.filter(
			(eachFavItem) => eachFavItem.showId !== idSearch
		);
		paintFav();
		storeData();
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
		storeData();
	}
}

const containerFav = document.querySelector('.js-favList');

// FUNCTION TO PAINT HTML FAV:
function paintFav() {
	let liFav = '';
	if (favArray.length === 0) {
		containerFav.innerHTML = `<div class="aside__favList--advice"><p>Tu lista de favoritos está vacía.</p><p>Realiza una búsqueda e incluye aquí tu selección.</p></div>`;
	} else {
		for (let i = 0; i < favArray.length; i++) {
			liFav += `<li class="js-favItem favList__favItem" data-id="${favArray[i].showId}">`;
			liFav += `<button class="js-btnQuit favList__favItem--btnQuit" data-id="${favArray[i].showId}" title="Eliminar de favoritos">x</button>`;
			liFav += `<h3 class="js-favItemTitle favList__favItem--title">${favArray[i].showName}</h3>`;
			liFav += `<img class="js-favItemImg favList__favItem--img" src="${favArray[i].showImage}" alt="${favArray[i].showAlt}" title="${favArray[i].showTitle}"/>`;
			liFav += `</li>`;
			containerFav.innerHTML = liFav;
		}
		addQuitFavEvent();
	}
}

// FUNCTION TO ADD EVENT TO EACH QUIT FAV BUTTON:
function addQuitFavEvent() {
	const buttonsQuit = document.querySelectorAll('.js-btnQuit');
	for (const btnQuit of buttonsQuit) {
		btnQuit.addEventListener('click', handleQuitFav);
	}
}

// FUNCTION TO QUIT FAV:
function handleQuitFav(event) {
	const idSearch = parseInt(event.currentTarget.dataset.id);
	favArray = favArray.filter((eachFavItem) => eachFavItem.showId !== idSearch);
	paintFav();
	paintSearch();
	storeData();
}

chargeData();

// FUNCTION TO STORE DATA IN LOCALSTORAGE:
function storeData() {
	const jsonData = JSON.stringify(favArray);
	localStorage.setItem('filledData', jsonData);
}

// FUNCTION TO GET DATA FROM LOCALSTORAGE:
function chargeData() {
	const storedData = localStorage.getItem('filledData');
	const lastData = JSON.parse(storedData);
	if (lastData !== null) {
		favArray = lastData;
	}
	paintFav();
}

// COLLAPSABLE FAV LIST:
const headerFav = document.querySelector('.js-favHeader');
const arrow = document.querySelector('.js-arrow');

function collapseFav() {
	containerFav.classList.toggle('collapse');
	arrow.classList.toggle('aside__favList--arrowUp');
	arrow.classList.toggle('aside__favList--arrowDown');
	
	if (containerFav.innerHTML.length > 0) {
		containerFav;
	}
}

headerFav.addEventListener('click', collapseFav);
