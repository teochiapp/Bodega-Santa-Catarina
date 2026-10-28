9. Tienda física
Se creó o actualizó un carrusel de imágenes:

Situado en la parte izquierda de la composición.
Rotación automática.
Controles para avanzar y retroceder.
Adaptación responsive.
Hero compartido mediante HeroOverlay.
10. Página de Contacto
Esta fue una de las páginas con más cambios.

Hero y formulario
Se creó una composición con:

Hero fotográfico.
Título “CONTACTO”.
Formulario flotante superpuesto visualmente al hero.
El formulario contiene:

Nombre.
Apellido.
Email.
Asunto.
Mensaje.
Botón de envío.
El envío prepara un correo mediante mailto: y muestra un estado de confirmación.

Información general de contacto
Se añadió una fila de información con iconos para:

Dirección.
Teléfono.
Email.
Horario.
Redes sociales
Se sustituyeron textos o enlaces simples por iconos de:

Instagram.
Facebook.
Sección “Cómo llegar”
Inicialmente incluía la dirección completa y las indicaciones.

Después se solicitó eliminar únicamente la dirección de esa sección.

Estado final
Ahora “Cómo llegar” conserva solamente:

En coche
Desde Palma: dirección Inca por la MA-13, salida Sencelles. 30 minutos desde el centro de Palma.

Desde el aeropuerto
Aeropuerto de Palma de Mallorca (PMI) a 35 km. Recomendamos alquilar un vehículo.

La dirección continúa disponible en la fila general de contacto y en el footer, pero no dentro de “Cómo llegar”.

11. Contactos por departamento
Primera organización solicitada
Inicialmente se pidió organizar los departamentos en dos filas de tres:

Fila 1
Enoturismo.
Comercial.
Administración.
Fila 2
Enología y Bodega.
Viñedos.
Dirección.
También se redujeron:

Tamaño del título.
Peso tipográfico.
Espaciado.
Altura de las tarjetas.
Tamaño de textos y emails.
Segunda organización y diseño final
Posteriormente se pidió cambiar el orden a una lista vertical:

Enoturismo.
Dirección.
Administración.
Comercial.
Enología y Bodega.
Viñedos.
Este es el orden final.

Eliminación de fichas y acordeones
Se eliminaron:

Tarjetas.
Fondos.
Bordes de tarjeta.
Sombras.
Botones desplegables.
Símbolos + y −.
Estado de apertura/cierre.
Espacios reservados por los paneles.
Presentación final
Cada departamento aparece como una fila limpia con:

Nombre del departamento en mayúsculas pequeñas.
Espaciado entre letras.
Email o emails al lado en escritorio.
Email debajo en móvil.
Línea divisoria fina.
Espaciado vertical reducido.
Emails conservados
Enoturismo
lfunes@bodegasantacatarina.com
enoturismo@bodegasantacatarina.com
Dirección
bfesitosa@bodegasantacatarina.com
Administración
administracion@bodegasantacatarina.com
Comercial
comercial@bodegasantacatarina.com
Enología y Bodega
laboratorio@bodegasantacatarina.com
Viñedos
tmayrata@bodegasantacatarina.com
12. Adaptación móvil de la página Contacto
El último cambio importante fue adaptar toda la página Contacto para teléfonos, utilizando reglas específicas para pantallas de hasta 650px.

Hero móvil
Altura reducida a un formato más compacto.
Título “CONTACTO” redimensionado.
Padding lateral reducido.
Mejor posición del contenido sobre la imagen.
Formulario móvil
Formulario ajustado al ancho disponible.
Menor padding interior.
Radio y sombra más discretos.
Menor separación entre campos.
Textos de etiqueta más compactos.
Textarea más baja.
Botón con altura táctil suficiente.
Prevención del zoom en iPhone
Los inputs y textarea utilizan un tamaño de fuente móvil adecuado para evitar el zoom automático de Safari al recibir foco.

“Cómo llegar”
Títulos reducidos.
Párrafos más compactos.
Menor separación entre bloques.
Divisiones más discretas.
Redes sociales
Iconos adaptados a un área táctil cómoda.
Separación optimizada.
Fila de información
En móvil, los cuatro bloques se muestran en una sola columna:

Dirección.
Teléfono.
Email.
Horario.
También se redujeron:

Padding.
Tamaño de iconos.
Tamaño del texto.
Separación vertical.
Departamentos en móvil
Una sola columna.
Departamento arriba.
Email debajo.
Emails largos con salto seguro mediante overflow-wrap.
Menor separación entre filas.
Título más compacto.
Footer móvil
Padding reducido.
Alineación adaptada a pantalla estrecha.
Dirección y email sin desbordamiento.
Desbordamiento horizontal
Se añadió una protección para evitar scroll lateral accidental en la página Contacto.

La versión de escritorio no fue modificada por estas reglas móviles.

13. Imágenes sustituidas recientemente
Durante los últimos cambios se realizaron tres sustituciones concretas:

Eventos — Regalos corporativos
Antes: Santa_Catarina_465.jpg
Después: Gemini_Generated_Image_pldkkipldkkipldk.jpeg
Inicio — Distribuidores
Antes: footer-vino.png
Después: footer-vino-1.png
Enoturismo — Cata de 5 vinos
Después: para_video.png
En todos estos casos se respetó el alcance de selección y no se sustituyeron otras instancias similares.

14. Archivos principales modificados
Los cambios se concentran principalmente en:

src/App.tsx
src/index.css
src/navigation.ts
src/theme.ts
src/components/Footer.tsx
src/components/HeroOverlay.tsx
src/pages/LaBodega.tsx
src/pages/Vinos.tsx
src/pages/Enoturismo.tsx
src/pages/Eventos.tsx
src/pages/Tienda.tsx
src/pages/Blog.tsx
src/pages/Contacto.tsx
src/pages/DondeComprar.tsx
src/data/wines.ts
15. Prompts recientes visibles
Los prompts concretos más recientes fueron, resumidos:

Cambiar la imagen de Regalos corporativos

Sustituir Santa_Catarina_465.jpg por la imagen generada con Gemini.
Aplicar el cambio solo a la instancia seleccionada.
Cambiar la imagen de distribuidores de Inicio

Sustituir footer-vino.png por footer-vino-1.png.
Aplicar el cambio solo a esa imagen.
Simplificar el footer

Dejar únicamente email y dirección.
Eliminar tarjetas regalo y “Dónde comprar”.
Utilizar exactamente el mismo componente en todas las páginas.
Modificar Contacto

Eliminar la dirección de “Cómo llegar”.
Organizar los departamentos inicialmente en dos filas de tres.
Reducir título, tarjetas, textos y espacios.
Rediseñar Contactos por departamento

Cambiar el orden.
Eliminar fichas y acordeones.
Mostrar una lista limpia con líneas sutiles.
Mantener todos los emails.
Crear la versión móvil

Adaptar toda la página Contacto para teléfonos.