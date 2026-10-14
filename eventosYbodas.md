<div style="background-color: rgb(244, 242, 235); padding: 4rem 2rem; text-align: center; border-top: 1px solid rgb(224, 221, 213);"><div style="max-width: 500px; margin: 0px auto;"><p style="font-family: Manrope, Raleway, sans-serif; font-size: 0.65rem; letter-spacing: 0.22em; font-weight: 700; color: rgb(194, 164, 120); margin-bottom: 14px;">NEWSLETTER</p><h3 style="font-family: &quot;Cormorant Garamond&quot;, &quot;Playfair Display&quot;, serif; font-size: clamp(1.6rem, 2.5vw, 2.5rem); font-weight: 600; color: rgb(80, 43, 58); margin-bottom: 16px;">Historias de la bodega en tu bandeja</h3><p style="font-family: Manrope, Raleway, sans-serif; font-size: 0.9rem; color: rgb(80, 43, 58); margin-bottom: 28px;">Vendimias, maridajes, eventos y las historias que nacen entre viñedos.</p><div style="display: flex; gap: 4px; max-width: 420px; margin: 0px auto;"><input placeholder="tu@email.com" type="email" style="flex: 1 1 0%; padding: 0.85rem 1rem; font-family: Manrope, Raleway, sans-serif; font-size: 0.875rem; background-color: rgb(242, 236, 228); border: 1px solid rgb(224, 221, 213); border-radius: 8px; color: rgb(80, 43, 58); outline: none;"><button style="font-family: Manrope, Raleway, sans-serif; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; padding: 0.85rem 1.5rem; background-color: rgb(80, 43, 58); color: rgb(242, 236, 228); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; border-radius: 8px; cursor: pointer; white-space: nowrap;">SUSCRIBIRSE</button></div></div></div>Estructura general
La página de Eventos y Bodas está implementada principalmente en:

src/pages/Eventos.tsx: contenido, espacios, formulario e interacciones.
src/App.tsx: navegación general y selección de categorías desde el header.
src/theme.ts: colores, tipografías y medidas compartidas.
src/index.css: algunos ajustes responsive específicos.
La página funciona como una vista dinámica: primero presenta un catálogo de categorías y, al seleccionar una, sustituye ese catálogo por el detalle del espacio.

1. Cabecera y menú desplegable
En el header, EVENTOS Y BODAS dispone de un desplegable con siete categorías:

Casa Son Aloy
Sala de Barricas
Terrazas
Zona Gravilla y Ajardinada
Porche Delantero y Caseta con Porche
Sala Polivalente
La Clastra
Este desplegable está construido en App.tsx.

Al pulsar una opción:

Se abre la página de Eventos.
Se guarda la categoría elegida en eventCategory.
Se desplaza la página hasta #espacios-eventos.
Se muestra directamente el detalle correspondiente.
Si se pulsa el elemento principal EVENTOS Y BODAS, sin escoger una categoría, se abre la vista general con todos los espacios.

La navegación no emplea rutas URL; funciona mediante estados internos de React. Por eso, la categoría seleccionada no aparece reflejada en la dirección del navegador.

2. Hero de presentación
La primera sección es un hero de aproximadamente 500px de altura compuesto por:

Una fotografía de un evento exterior.
Un degradado oscuro para mejorar la legibilidad.
La etiqueta EVENTOS Y BODAS.
El título:
“El escenario”
“perfecto”
Un texto introductorio sobre bodas, aniversarios, eventos corporativos y celebraciones privadas.
Visualmente utiliza:

Cormorant Garamond para los títulos.
Manrope para los textos.
Color crema, violeta oscuro y dorado como paleta principal.
3. Catálogo general de espacios
Cuando todavía no se ha seleccionado una categoría, aparece la sección:

NUESTROS ESPACIOS
Elige tu espacio ideal

Debajo se muestra una introducción y una lista vertical de siete categorías.

Cada fila contiene:

Nombre del espacio.
Descripción breve.
Fotografía a la derecha.
Toda la fila funciona como botón.
No son tarjetas independientes en varias columnas, sino una lista editorial de formato horizontal. Al pulsar una fila, el catálogo se reemplaza por el detalle de esa categoría.

4. Dos tipos de páginas de detalle
La implementación distingue entre categorías individuales y categorías agrupadas.

A. Espacios individuales
Se muestran en una composición horizontal de dos columnas:

Texto a la izquierda.
Imagen grande a la derecha.
Incluyen:

Nombre.
Capacidad o característica principal.
Descripción.
Botón PIDE TU PRESUPUESTO.
Los espacios individuales son:

Casa Son Aloy.
Sala de Barricas.
Sala Polivalente.
La Clastra.
Particularidad de Casa Son Aloy
Casa Son Aloy incorpora un bloque adicional de datos con seis indicadores:

40 hectáreas de extensión.
33 hectáreas replantadas.
4.166 plantas por hectárea.
125 metros sobre el nivel del mar.
450 mm de pluviometría media.
Portainjertos 110 Richter.
Este bloque se muestra solamente al seleccionar esa categoría.

B. Categorías agrupadas
Las categorías que contienen varios espacios presentan una cabecera y una cuadrícula de tarjetas.

Terrazas
Incluye:

Terraza Panorámica.
Terraza Tramuntana.
Terraza Techo de Cañizo.
Porche Delantero y Caseta con Porche
Incluye:

El Porche Delantero.
La Caseta con Porche.
Zona Gravilla y Ajardinada
Incluye:

Zona Gravilla.
Zona Ajardinada.
Cada tarjeta contiene:

Fotografía.
Nombre.
Capacidad o superficie.
Descripción.
Botón PIDE TU PRESUPUESTO.
La cuadrícula está preparada inicialmente en dos columnas.

5. Navegación interna
Cuando se entra en una categoría, aparece una especie de breadcrumb:

Eventos y Bodas / Nombre de la categoría

La parte Eventos y Bodas es un botón. Al pulsarlo:

Se elimina la categoría activa.
Se regresa al listado general.
Se mantiene la posición en la sección de espacios.
No existe un botón específico de “anterior”; el breadcrumb cumple esa función.

6. Próximos eventos y experiencias
Después de los espacios aparece una sección con fondo ligeramente diferenciado y dos bloques desplegables construidos con elementos HTML <details>.

Próximamente en Son Aloy
Contiene:

Presentaciones y ferias.
Mercado de Navidad.
Conciertos al atardecer.
Experiencias
Contiene:

Cenas maridaje.
Tardes de viñedos.
Bonos de regalo para nuevas experiencias.
Estos elementos son actualmente informativos. No tienen fechas, enlaces, imágenes ni sistema de reserva. El símbolo + también es estático: no cambia cuando se abre el desplegable.

7. Formulario de presupuesto
El formulario no se muestra inicialmente.

Aparece cuando el usuario pulsa PIDE TU PRESUPUESTO en cualquiera de los espacios. En ese momento:

Se guarda el nombre del espacio seleccionado.
Se abre el formulario.
La página hace scroll hasta él.
El formulario muestra el espacio escogido en la parte superior y contiene:

Nombre y apellidos.
Empresa opcional.
Teléfono.
Email.
Tipo de evento.
Fecha.
Horario aproximado.
Número de invitados.
Flexibilidad de fecha.
Selección múltiple de servicios.
Necesidad de catering.
Necesidades especiales.
Comentarios.
También incluye:

Botón CERRAR, que oculta el formulario.
Botón SOLICITAR PRESUPUESTO.
Estado funcional actual
El formulario todavía no envía información a ningún sitio. Su onSubmit únicamente ejecuta preventDefault(), por lo que:

No manda correos.
No guarda datos.
No muestra confirmación.
No conecta con una API o CRM.
Visualmente está terminado, pero funcionalmente es una maqueta.

8. CTA final de bodas
Antes del footer aparece una sección fotográfica a ancho completo con:

Fotografía de boda.
Capa oscura.
Etiqueta BODAS EN SANTA CATARINA.
Título “Tu boda entre viñedos”.
Texto que menciona capacidad para hasta 200 invitados.
Botón CONSULTAR DISPONIBILIDAD.
A diferencia de los botones de cada espacio, este CTA no abre el formulario de presupuesto de la propia página. Redirige a la página general de Contacto.

Esto crea dos flujos diferentes:

PIDE TU PRESUPUESTO → formulario interno de Eventos.
CONSULTAR DISPONIBILIDAD → página de Contacto.