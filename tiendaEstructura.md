Estructura general
La página de Tienda Física está implementada principalmente en:
Estructura general
La página de Tienda Física está implementada principalmente en:

src/pages/Tienda.tsx: contenido, galería e interacción.
src/index.css: estilos específicos y adaptación responsive.
src/theme.ts: colores y tipografías compartidas.
src/App.tsx y src/navigation.ts: acceso y navegación entre páginas.
Es una página relativamente sencilla y editorial. No funciona como comercio electrónico: su objetivo es presentar la tienda de Son Aloy, enseñar sus productos y conducir al usuario a Contacto.

Su estructura es:

Hero
└── Presentación e información práctica
└── Carrusel de siete fotografías
└── Llamada a la acción
└── Footer
1. Acceso a la página
La Tienda Física se puede abrir desde:

La pestaña TIENDA FÍSICA del header.
La tarjeta de Tienda Física que aparece en la página de inicio.
Los enlaces correspondientes del footer.
Internamente se identifica mediante la clave:

"tienda"
Al seleccionarla, App.tsx renderiza:

<Tienda navigate={navigate} />
Como el resto de la web, funciona mediante estado interno de React y no mediante una ruta URL independiente.

2. Hero de presentación
La página comienza con un hero de 500px de altura.

Está compuesto por:

Una fotografía de la tienda.
Un degradado oscuro violeta sobre la imagen.
La etiqueta:
SON ALOY · SENCELLES

El título:
Tienda física

La fotografía utilizada es también la primera imagen del carrusel:

tienda-fisica-01.jpg
La imagen cubre todo el hero mediante object-fit: cover, con un pequeño ajuste de encuadre vertical:

objectPosition: "center 58%"
El degradado se concentra en la parte inferior para que el texto blanco mantenga buena legibilidad.

3. Introducción editorial
Después del hero aparece una sección de presentación dividida en dos columnas.

Columna izquierda
Contiene:

La etiqueta BODEGA SANTA CATARINA.
El título:
Un rincón de Mallorca para llevarte a casa

El título utiliza la tipografía serif de la web y tiene un tamaño grande para funcionar como principal mensaje editorial de la página.

Columna derecha
Contiene un texto explicativo:

Visita nuestra tienda en la finca Son Aloy y descubre los vinos de Santa Catarina junto a una selección cuidada de productos artesanales y gastronómicos de Mallorca.

Debajo aparecen dos datos prácticos mediante una lista de definiciones:

Ubicación
Finca Son Aloy, carretera Inca–Sencelles, Km 3

Visita
Consulta disponibilidad y horarios antes de venir

Cada dato está separado mediante una línea dorada superior. Las etiquetas “Ubicación” y “Visita” aparecen en dorado y mayúsculas.

Distribución
En escritorio, la sección utiliza dos columnas de distinto tamaño:

Aproximadamente 40% para el título.
Aproximadamente 60% para texto e información práctica.
En pantallas inferiores a 800px, pasa a una única columna.

4. Carrusel fotográfico
La pieza principal de la página es una galería con siete fotografías.

Las imágenes se encuentran declaradas en el array STORE_IMAGES:

Mostrador y selección de vinos.
Productos artesanales mallorquines.
Expositor de productos locales y capazos.
Selección de vinos.
Capazo artesanal Santa Catarina.
Productos gourmet.
Interior de la tienda física.
Cada imagen tiene un texto alternativo descriptivo para accesibilidad.

5. Funcionamiento del carrusel
El carrusel está controlado mediante el estado:

const [activeImage, setActiveImage] = useState(0)
Este número representa la fotografía visible.

Controles laterales
Dispone de dos botones circulares superpuestos:

Flecha izquierda: imagen anterior.
Flecha derecha: imagen siguiente.
La navegación es circular:

Al retroceder desde la primera imagen se muestra la última.
Al avanzar desde la última se vuelve a la primera.
Esto se consigue mediante operaciones de módulo sobre la longitud del array.

Contador
En la esquina inferior derecha aparece un contador con el formato:

01 / 07
02 / 07
03 / 07
Los números se completan con un cero inicial mediante padStart.

Miniaturas
Debajo de la fotografía principal se muestran las siete miniaturas.

Cada miniatura funciona como un botón:

Al pulsarla, se convierte directamente en la imagen activa.
La fotografía seleccionada aparece con mayor opacidad.
También recibe un borde dorado.
Las demás permanecen parcialmente atenuadas.
La miniatura activa utiliza además aria-current, lo que mejora la interpretación por tecnologías de asistencia.

6. Tratamiento visual de las fotografías
Tanto la imagen principal como las miniaturas reciben el mismo filtro:

filter: saturate(0.78) sepia(0.08) contrast(0.96);
Este tratamiento:

Reduce ligeramente la saturación.
Añade un pequeño matiz cálido.
Suaviza el contraste.
Unifica fotografías tomadas en condiciones de iluminación diferentes.
El resultado busca que toda la galería tenga una tonalidad más coherente con la identidad crema, dorada y violeta de Santa Catarina.

7. Adaptación responsive de la galería
En escritorio:

La galería tiene un ancho máximo de 1320px.
La imagen principal puede alcanzar 720px de altura.
Las siete miniaturas aparecen en una sola fila.
En pantallas inferiores a 800px:

La imagen principal pasa a tener 440px de altura.
Las miniaturas se distribuyen en cuatro columnas.
La segunda fila contiene las tres miniaturas restantes.
La sección introductoria también pasa de dos columnas a una.

No hay actualmente un ajuste adicional para teléfonos muy estrechos, por lo que los controles de 48 píxeles y la altura fija de 440 píxeles se mantienen en móvil.

8. Sección “Planifica tu visita”
Después de la galería aparece una llamada a la acción centrada, sobre un fondo arena claro.

Contiene:

La etiqueta:
PLANIFICA TU VISITA

El título:
Te esperamos en Son Aloy

Un texto explicativo:
Escríbenos para confirmar el horario de la tienda o para consultar disponibilidad de vinos y productos.

El botón:
CONTACTAR

Al pulsar CONTACTAR, el usuario es enviado a la página general de Contacto:

navigate("contacto")
No abre un formulario dentro de la propia página ni selecciona automáticamente un asunto relacionado con la tienda.