'use strict';

// [] 1.- crear objeto tipo para trabajar con los datos
// [] 2.- Leer el input.value del campo textArea
// []   2.1.- recoger ese string en una constante  ***revisar *FUNCION PARA ENVÍO DE DATOS AL API* más abajo
// []   2.2.-
// [] 3.- Evento escuchador-->boton Search  +  handle-->llamada a API
// [] 4.- fetch al API (http://api.tvmaze.com/search/shows?q=)
// []   4.1.- .then con response.json
// [] 5.-



// FUNCION PARA ENVÍO DE DATOS AL API:
//
// function sendRequest() {
// 	console.log('entro en funcion antes de fetch');
// 	fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/', {
// 		method: 'POST',
// 		body: JSON.stringify(data),
// 		headers: {'content-type': 'application/json',},
// 	})
// 		.then(function (resp) {return resp.json();})
// 		.then(function (result) {showURL(result);})
// 		.catch(function (error) {console.log(error);});
// }
