Sitemap actual
La web funciona como una SPA de React: todas las páginas se muestran dentro de la misma URL mediante estado interno. No existen rutas independientes como /vinos o /contacto.

Bodega Santa Catarina
├── Inicio
├── La Bodega
├── Vinos
├── Enoturismo
│   ├── Cata y visitas
│   └── Almuerzos en el viñedo
├── Eventos y Bodas
├── Dónde Comprar
├── Tienda Online
├── Blog
└── Contacto
Elementos globales
Header
Logo con acceso a Inicio.
Navegación principal con las nueve páginas.
Enoturismo tiene un desplegable:
Cata y visitas.
Almuerzos en el viñedo.
Icono de tarjeta regalo, que lleva a Tienda Online.
Icono de bolsa, que lleva a Vinos.
El encabezado permanece fijo durante el desplazamiento.
Footer
Nombre de la bodega y navegación vertical.
Frase de marca: “Mallorca siempre inspira”.
Dirección, teléfono y correo.
Accesos a:
Tarjetas regalo.
Dónde comprar.
Aviso legal, Privacidad y Cookies.
Facebook e Instagram.
Los botones legales todavía no abren páginas específicas.

Estructura de cada página
1. Inicio
Página de presentación y principal distribuidor de tráfico.

Hero con vídeo

“Bodega Santa Catarina”.
Botón “Reservar experiencia”.
Botón “Descubrir nuestros vinos”.
Bloque Nuestra Bodega

“Un legado vivo”.
Resumen de la historia.
Acceso a La Bodega.
Cuatro accesos visuales

Enoturismo.
Nuestros Vinos.
Eventos y Bodas.
Tienda Online.
Carrusel “Vinos con alma”

Muestra cuatro vinos.
Flechas para recorrer el catálogo.
Acceso a la página Vinos.
Próximos eventos

Conciertos.
Mercado de Navidad.
Cenas maridaje.
Tardeos.
Acceso a Eventos y Bodas.
Bodas y celebraciones

Presentación de espacios.
Acceso a Eventos y Bodas.
Distribuidores

Introducción a la red comercial.
Acceso a Dónde Comprar.
Footer.

Observación sobre el vídeo
El vídeo de Inicio todavía está configurado con muted, por lo que actualmente no reproduce audio. Para tener sonido sin bloquear la reproducción automática en navegadores, convendría incorporar un botón visible de “Activar sonido”.

2. La Bodega
Página institucional e histórica.

Hero

“El nacimiento de una bodega”.
La visión de Stellan Lundqvist

Historia del fundador.
Imagen de vendimia.
Cronología

1984: Fundación.
1992: Raíces autóctonas.
2018: Renovación generacional.
2026: Certificación ecológica.
Finca Son Aloy

85 hectáreas.
Fundación en 1984.
100 % ecológico certificado.
La bodega, paso a paso

Nuestra Historia.
Los Viñedos.
Elaboración.
Sala de Barricas.
La Clastra.
Sostenibilidad.
Cita de filosofía

Cierre emocional de marca.
Footer.

3. Vinos
Página de catálogo, sin compra directa.

Hero

“Vinos nobles con alma”.
Filosofía

El vino como expresión del territorio.
Gama sta

Manto Negro.
Callet.
Prensal.
Giró Ros.
Colección Surant

Surant Blanco.
Surant Rosado.
Colección ‘Nguany

‘Nguany Tinto.
‘Nguany Blanco.
‘Nguany Rosado.
Información desplegable lateral por vino

Historia y nota de cata.
Maridaje.
Variedad y añada.
Reconocimientos.
Botón de ficha técnica.
Footer.

El botón “Descargar ficha técnica” todavía es visual; no tiene un archivo o descarga conectada.

4. Enoturismo
Es la página con el flujo funcional más completo.

Hero

Presentación de las experiencias.
Selector de categoría

Cata y visitas.
Experiencias gastronómicas.
Catas y visitas

Cata de 3 vinos: 20 €/persona.
Cata de 5 vinos: 25 €/persona.
Cata de 3 vinos más visita: 40 €/persona.
Cata de 5 vinos más visita: 45 €/persona.
Experiencias gastronómicas

Menú Tapas: 65 €/persona.
Menú Paella: desde 75 €/persona.
Menú Barbacoa: desde 75 €/persona, mínimo 15 personas.
Reserva online desplegable

Selección de experiencia.
Datos personales.
Número de asistentes.
Idioma.
Comentarios.
Calendario interactivo.
Selección de horario.
Resumen del precio.
Pago simulado

Resumen de la reserva.
Aceptación de condiciones.
Botón “Pagar y confirmar”.
Confirmación

Resumen final.
Ejemplo del email automático.
Ejemplo del SMS automático.
Condiciones de cancelación.
Botón para iniciar una nueva reserva.
Información práctica

Horarios.
Idiomas.
Cómo llegar.
Parking.
Preguntas frecuentes

Necesidad de reserva.
Acceso de menores.
Cancelaciones.
Footer.

El calendario, el pago y las confirmaciones funcionan como simulación local; todavía no están conectados a una pasarela de pago, base de datos ni servicio real de correo/SMS.

5. Eventos y Bodas
Hero

“El escenario perfecto”.
Nuestros espacios

Terraza Panorámica.
Sala de Barricas.
Casa Son Aloy.
Sala de Catas.
La Caseta con Porche.
Botón “Resérvalo” en cada espacio

Abre el formulario.
Guarda el espacio seleccionado.
Desplaza al usuario hasta el formulario.
Agenda desplegable

Presentaciones y ferias.
Mercado de Navidad.
Conciertos al atardecer.
Experiencias desplegables

Cenas maridaje.
Tardes de viñedos.
Bonos regalo.
Eventos corporativos y celebraciones privadas

Almuerzos y cenas de empresa.
Reuniones.
Team building.
Actividades de integración.
Talleres.
Vinos personalizados.
Acceso a Contacto.
Formulario de solicitud

Datos personales y empresa.
Tipo de evento.
Fecha y horario.
Número de invitados.
Flexibilidad.
Servicios.
Catering.
Necesidades especiales.
CTA de bodas

“Tu boda entre viñedos”.
Consulta de disponibilidad.
Footer.

Diferencia encontrada
En el código actual todavía aparece “Sala de Catas”, con la imagen anterior y su descripción original. El cambio solicitado a “El Porche Delantero” no está reflejado en el estado actual del archivo.

También la Sala de Barricas sigue utilizando Santa_Cararina_387.jpg, no la imagen Santa_Cararina_390-2.jpg mencionada anteriormente.

6. Dónde Comprar
La página está dividida en distribución internacional y Mallorca.

Mapa internacional

Mallorca como origen.
Destinos interactivos:
Canadá.
Bélgica.
Alemania.
Suiza.
Italia.
Península.
Cada destino despliega uno o varios distribuidores.
Enlaces a las webs externas.
Mapa interactivo de Mallorca

Seis puntos:
Catavinos, Palma.
Vinàmica, Lloseta.
SUES, Marratxí.
5 Caixes y Mitja, Felanitx.
Licors Moyà, Artà.
Can Xisco, Sa Cabaneta.
Tarjetas flotantes con dirección, teléfono y enlace.
Footer.

7. Tienda Online
En realidad funciona principalmente como página de tarjetas regalo y accesos comerciales, no como ecommerce completo.

Hero

“Regala una experiencia única”.
Tarjetas regalo

Bono 1: 150 € para dos personas.
Bono 2: 250 € para dos personas.
Bono personalizado.
Características

Bono digital.
Envío por email.
Validez de 12 meses.
Personalizable.
Reserva flexible.
Botones

Solicitar tarjeta regalo → Contacto.
Ver experiencias → Enoturismo.
Santa Catarina en casa

Vinos.
Tarjetas regalo.
Merchandising.
CTA a Vinos

“Descubre nuestra colección”.
Footer.

No existe todavía carrito, checkout, gestión de pedidos ni pago real de productos.

8. Blog
Actualmente funciona como una página editorial con un único artículo destacado.

Hero

“Historias de la bodega”.
Artículo destacado

“Vendimia 2024: la cosecha del renacimiento”.
Imagen.
Introducción.
Cuerpo completo del artículo.
Bloque lateral de vendimia

Acceso a Enoturismo.
Bloque lateral de tarjetas regalo

Acceso a Tienda.
Newsletter

Campo de email.
Botón de suscripción.
Footer.

La newsletter todavía no envía los datos a ningún servicio. Tampoco existe un listado, categorías o páginas individuales para varios artículos.

9. Contacto
Hero

“Contacto”.
Información rápida

Dirección.
Teléfono y WhatsApp.
Email.
Horarios.
Cómo llegar desde Palma y el aeropuerto.
Botón de Google Maps.
Formulario

Nombre.
Teléfono.
Email.
Asunto.
Mensaje.
Confirmación visual después del envío.
Información complementaria

Tarjetas regalo.
Indicaciones para llegar.
Transfer privado.
Redes sociales.
Mapa de Google

Ubicación de Sencelles.
Cierre

“Te esperamos en Mallorca”.
Footer.

El envío del formulario es una simulación local; no manda emails ni almacena consultas. Los enlaces sociales de esta sección usan todavía #.

Evaluación del sitemap
Lo que está bien organizado
La división entre contenido corporativo, catálogo, experiencias y contacto es clara.
Inicio funciona correctamente como distribuidor hacia las áreas principales.
Enoturismo y Eventos tienen llamadas a la acción visibles.
Dónde Comprar diferencia bien entre Mallorca y mercados internacionales.
La navegación global permite acceder a todas las páginas.
Puntos a revisar
Demasiados elementos en el menú principal
Hay nueve opciones. Tienda, Blog y Contacto podrían tratarse como navegación secundaria.

No hay URLs independientes
Al navegar no cambia la URL. Esto limita:

Compartir páginas concretas.
SEO.
Botón atrás del navegador.
Recarga de una sección.
Analítica por página.
Solapamiento entre Vinos y Tienda
Vinos es un catálogo y Tienda no permite comprar vinos realmente. Debe decidirse si:

Vinos tendrá compra directa, o
Tienda será el ecommerce completo.
Duplicación de tarjetas regalo
Aparecen en Header, Footer, Inicio, Tienda, Blog y Contacto. Conviene definir Tienda/Tarjetas regalo como destino principal y que el resto solo enlace hacia allí.

Eventos y Enoturismo se cruzan
Las experiencias gastronómicas, cenas maridaje y bonos aparecen en más de una página. Se debería separar claramente:

Enoturismo: experiencias reservables para visitantes.
Eventos: celebraciones privadas, bodas y empresas.
Contenido pendiente de integración real

Pago de reservas.
Emails y SMS.
Formularios.
Newsletter.
Compra online.
Fichas técnicas.
Páginas legales.
Redes sociales.