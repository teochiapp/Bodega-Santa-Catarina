# Bodega Santa Catarina — Reglas y Contexto de Desarrollo

## Contexto del proyecto

**Bodega Santa Catarina** — Viticultura de precisión en el Mediterráneo. Sitio institucional para una bodega de vinos en Mallorca (desde 1984), con foco en la herencia geológica y cultural de la región.

Además del contenido institucional, el sitio incluye:
- **Sistema de reservas** para experiencias de cata (tipo Amelia de WordPress, pero desarrollado a medida).
- **Tarjetas de regalo** (compra y posterior canje).
- **Panel de administración básico** para gestión de contenido y disparo de emails automáticos (confirmación de reserva, envío de tarjeta de regalo, recordatorios, etc.).

## Stack

- **Frontend:** React
- **Backend:** Node.js (API + gestión de contenido + lógica de reservas/emails)
- **Ruteo:** React Router
- **Estilos:** styled-components
- **Animaciones/transiciones:** Framer Motion
- **Panel admin:** desarrollo propio, básico — CRUD de contenido + triggers de email automático
- **Base de datos:** MySQL
- **ORM:** Prisma (sin TypeScript — se pierde el tipado automático pero se mantienen migraciones versionadas y el schema declarativo como documentación del modelo de datos)
- **Mailer:** Brevo (transaccional — confirmación de reserva, tarjetas de regalo, recordatorios)

---

## Arquitectura frontend: Container Pattern

**Pages**
- Solo componen componentes. Cero lógica de negocio, cero fetching, cero estado más allá de composición.
- Una page = un layout + los componentes que la arman.

**Components**
- Ahí vive toda la lógica modular: estado, efectos, fetching, manejo de formularios, validaciones.
- Cada componente es responsable de su propio dominio (ej: `ReservaForm`, `TarjetaRegaloCard`, `CatasCalendar`).
- Si un componente necesita lógica compartida entre varios (fetch de disponibilidad, validación de fechas, etc.), esa lógica se extrae a un **custom hook**, no se duplica.

**Regla práctica:**
```
pages/
  ReservasPage.jsx        → arma la vista con <CatasCalendar /> + <ReservaForm />
components/
  CatasCalendar/
    CatasCalendar.jsx     → lógica, estilos (styled-components) y render, todo en el mismo archivo
  ReservaForm/
    ReservaForm.jsx
hooks/
  useDisponibilidad.js    → lógica compartida entre componentes
```

---

## Clean Code — reglas base

- **DRY (Don't Repeat Yourself):** si una lógica se repite 2+ veces, se extrae a hook, util o componente reutilizable.
- **Un componente, una responsabilidad.** Si un componente hace fetch, maneja formulario y renderiza modal, se separa.
- **Nombres explícitos:** funciones y componentes con nombres que digan qué hacen, no cómo (`useReservaDisponible`, no `useData2`).
- **Sin lógica de negocio en pages.** Si aparece un `useEffect` o `useState` en una page, es una señal de que esa lógica pertenece a un componente o hook.
- **Estilos en el mismo archivo:** los `styled.div`, `styled.button`, etc. de un componente se definen arriba (o al final) del propio `.jsx`, no en un archivo `.styles.js` separado. No hay un archivo gigante de estilos globales salvo tokens/tema compartido.
- **Un solo archivo de tema** (`theme.js`) para colores, tipografías y spacing — nada hardcodeado en los componentes.

---

## Estructura de carpetas (frontend, propuesta inicial)

```
src/
  pages/
  components/
  hooks/
  services/        → llamadas a la API (fetch/axios centralizado)
  context/          → si aplica (ej: carrito de tarjetas de regalo, estado de reserva en curso)
  theme/
  utils/
```

## Backend

- **Separación por capas:**
  - `routes/` → define endpoints, solo mapea URL + método a un controller.
  - `controllers/` → recibe el request, valida input, llama al service, devuelve response.
  - `services/` → lógica de negocio real (crear reserva, verificar disponibilidad, canjear tarjeta).
- Un service por dominio (`reservasService`, `emailService`, `tarjetasRegaloService`, `authService`).
- Mismo principio DRY aplica: nada de lógica de envío de email duplicada entre reservas y tarjetas de regalo — un `emailService` central con templates.

**Auth del panel admin:**
- JWT con login por email/password.
- El admin loguea una vez, recibe un token, y las rutas del panel (`/api/admin/*`) quedan protegidas por un middleware que valida ese token.
- Stateless — no requiere manejo de sesiones en servidor.

---

## Deploy

- **Hosting:** Hostinger Cloud Hosting (no VPS, no Docker/Coolify como en otros proyectos de SurCodes).
- **Servicio de Node:** para la API/backend.
- **Servicio estático:** para el build de React (frontend).
