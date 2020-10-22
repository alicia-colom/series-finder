![Adalab](https://beta.adalab.es/resources/images/adalab-logo-155x61-bg-white.png)

# **Alicia Colom** · PromoKizzy

### **JavaScript · Evaluación final · Módulo 2**

### _http://beta.adalab.es/modulo-2-evaluacion-final-alicia-colom/_

---

¡Hola! Este es mi ejercicio de evaluación de los conocimientos sobre **JavaScript**, adquiridos durante el módulo 2 de la **#PromoKizzy** de **ADALAB**.

- En este ejercicio encontrarás una **aplicación web** con un servicio de **buscador** de películas y series a través de un **API**.

- También ofrece el servicio de creación de una **lista de favoritos** personalizada, pudiendo incluir en esta los elementos de la búsqueda seleccionados.

- Estos elementos quedan almacenados en el **localStorage** del usuario para poder acceder a ellos en siguientes visitas a la web.

-

---

## Estructura de carpetas

La estructura de carpetas de mi evaluación es la siguiente:

```
src
 ├─ images
 |  ├─ logo.jpg
 |  └─ favicon.png
 ├─ js
 |  └─ main.js
 ├─ scss
 |  ├─ components
 |  ├─ core
 |  ├─ layout
 |  └─ pages
 └─ html
    ├─ partials
    └─ index.html
```

---

## Guía de inicio rápido

_\* **NOTA:** Necesitas tener instalado [Node JS](https://nodejs.org/)_

### Pasos para arrancar el proyecto:

Una vez hemos instalado las dependencias
(`npm install`) , procedemos a arrancar el proyecto.
Para ello ejecutamos el comando `npm start`.

Este proyecto incluye un motor de plantillas HTML, el preprocesador SASS y un servidor local, entre otras muchas cosas.

## _gulpfile.js_ y _config.json_

**`gulpfile.js`** usa el fichero `config.json` de configuración con las rutas de los archivos a generar / observar.

De esta manera separarmos las acciones que están en `gulpfile.js` de la configuración de las acciones que están en `config.json`.

### Flujo de archivos con Gulp

Estas tareas de Gulp producen el siguiente flujo de archivos:

![Gulp flow](./gulp-flow.png)
