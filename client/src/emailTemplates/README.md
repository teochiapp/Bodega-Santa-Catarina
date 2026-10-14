# 📧 Plantillas de Email y CRM — Brevo (Sendinblue)

Bodega Santa Catarina utiliza **Brevo** como motor de CRM para la gestión de contactos de newsletter y envíos transaccionales.

---

## 🔒 Arquitectura Segura

A diferencia de clientes de email en el navegador, **Brevo no expone claves API en el frontend** (por seguridad y restricciones de CORS). 

El flujo de suscripción opera así:
1. El usuario introduce su email en el Blog (`Newsletter.jsx`).
2. El cliente envía la solicitud a nuestro backend: `POST /api/newsletter/subscribe`.
3. El servidor (`server/services/brevoService.js`) se comunica con la API v3 de Brevo utilizando `BREVO_API_KEY` de forma 100% segura.
4. El contacto se guarda o actualiza en la lista de suscriptores del CRM de Brevo (con fecha y origen).
5. Opcionalmente, Brevo envía el email de bienvenida automático mediante su motor transaccional o mediante un escenario de Automation.

---

## 🛠️ Configuración en Brevo (Paso a paso)

### Paso 1: Obtener tu API Key en Brevo
1. Inicia sesión en [https://app.brevo.com/](https://app.brevo.com/).
2. Haz clic en el nombre de tu cuenta (arriba a la derecha) y entra en **SMTP y API** (o **API Keys**).
3. Haz clic en **Generar una nueva clave API**.
4. Nómbrala (ej: `Web Bodega Santa Catarina`) y copia la clave generada (`xkeysib-...`).

### Paso 2: Crear la Lista de Contactos
1. En el menú lateral de Brevo, ve a **Contactos** > **Listas**.
2. Haz clic en **Crear una lista** y ponle de nombre `Newsletter Web` (o el que prefieras).
3. Fíjate en el número de ID que aparece al lado de la lista (ej: `2` o `3`).

### Paso 3: (Opcional) Crear la Plantilla de Email de Bienvenida
1. En Brevo, ve a **Campañas** > **Plantillas** (o **Transaccional** > **Plantillas**).
2. Haz clic en **Nueva plantilla**.
3. En la configuración:
   - **Nombre de plantilla:** `Bienvenida Newsletter`
   - **Asunto:** `Bienvenido a las historias de Bodega Santa Catarina`
   - **De (Nombre):** `Bodega Santa Catarina`
   - **De (Email):** Tu email verificado en Brevo (ej: `info@santacatarina.es`).
4. En el paso de diseño:
   - Selecciona **Pegar tu código** (código HTML).
   - Pega todo el contenido de `newsletterTemplate.html`.
5. Guarda y activa la plantilla. Copia el **ID de la plantilla** que Brevo te asigna (ej: `1`).

---

## ⚙️ Variables de entorno en `server/.env`

Añade o edita estos valores en tu archivo `server/.env`:

```env
# Brevo (Sendinblue)
BREVO_API_KEY=xkeysib-tu_clave_api_aqui
BREVO_NEWSLETTER_LIST_ID=2
BREVO_NEWSLETTER_TEMPLATE_ID=1
```

*(Si `BREVO_NEWSLETTER_TEMPLATE_ID` se deja vacío, el contacto se agregará a la lista del CRM sin disparar un correo transaccional directo, ideal si usas un Workflow de Automatización de Brevo).*
