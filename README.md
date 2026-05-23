# Digital Money House 💸

Proyecto final de la especialización Frontend del programa **Certified Tech Developer** de Digital House.

Digital Money House es una **billetera virtual** desarrollada con Next.js 14 que permite a los usuarios realizar pagos de servicios, gestionar sus finanzas personales y acceder desde cualquier dispositivo: desktop, tablet y mobile.

🔗 [Ver demo en producción](https://digital-money-house-one.vercel.app)

---

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/abrillgomez/digital-money-house.git
   ```

2. Clonar el archivo `.env.example` y renombrarlo a `.env`:
   ```bash
   cp .env.example .env
   ```

3. Instalar las dependencias:
   ```bash
   npm install
   ```

4. Ejecutar el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Tecnologías Utilizadas

**Framework y lenguaje**
- **Next.js 14** — Framework de React con App Router.
- **TypeScript** — Tipado estático para mayor robustez y mantenibilidad.
- **React 18** — Librería para construir interfaces de usuario.

**Estilos**
- **Tailwind CSS** — Framework de CSS para diseño moderno y responsivo.

**Formularios y validaciones**
- **React Hook Form** — Manejo de formularios con rendimiento optimizado.
- **Yup** — Validación de esquemas de datos.

**HTTP y autenticación**
- **Axios** — Cliente HTTP para llamadas a la API.
- **JWT Decode** — Decodificación de tokens JWT para manejo de sesión.

**UI / Componentes**
- **Headless UI** — Componentes accesibles sin estilos predefinidos.
- **React Icons / FontAwesome / Heroicons** — Íconos para la interfaz.
- **SweetAlert2** — Modales y alertas estilizadas.
- **React Payment Inputs** — Inputs especializados para datos de tarjetas.
- **React Spinners** — Indicadores de carga.

**Utilidades**
- **clsx** — Construcción de clases CSS condicionales.
- **date-fns / date-fns-tz** — Formateo y manejo de fechas con soporte de zonas horarias.

---

## Funcionalidades

### Sprint 1 — Inicio, Registro y Acceso

**Landing page**
- Responsive: funciona desde desktop, tablet y mobile.
- Visualización de las funcionalidades principales del producto.
- Acceso directo a "Iniciar sesión" y "Registro".

**Registro**
- Validación de los datos ingresados.
- Mensaje de error ante datos incorrectos.
- Redirección a la página de Login tras un registro exitoso.

**Login**
- Ingreso de email y contraseña en dos pasos separados.
- Validación de campos requeridos con mensajes de error.
- Redirección a `/home` tras un login exitoso.

**Cierre de sesión**
- La sesión persiste al recargar el navegador.
- Al cerrar sesión: eliminación del token del localStorage y redirección a la landing page.

---

### Sprint 2 — Dashboard, Mi Perfil y Gestión de Medios de Pago

**Dashboard**
- Visualización del saldo disponible en ARS (con dos decimales).
- Accesos directos a "Ingresar dinero" y "Ver mi CVU".
- Barra lateral con menú siempre visible.
- Resumen de últimos movimientos con buscador.

**Mi Perfil**
- Edición de datos personales y alias desde la misma pantalla.
- Alias en formato `palabra.palabra.palabra`.
- Copia de CVU y alias al portapapeles.
- Contraseña enmascarada con `******`.

**Gestión de Medios de Pago**
- Agregar tarjetas con detección automática del tipo (Visa, Mastercard, AMEX) según los primeros 4 dígitos.
- Límite de 10 tarjetas con mensaje de aviso al alcanzarlo.
- Visualización de las últimas 4 cifras de cada tarjeta.
- Al eliminar la última tarjeta, se muestra el mensaje "No tienes tarjetas asociadas".

---

### Sprint 3 — Ingreso de Dinero y Mi Actividad

**Ingreso de Dinero**
- Listado y selección de medios de pago disponibles.
- Ingreso del monto a cargar.
- Pantalla de comprobante tras el ingreso exitoso.
- Visualización, copia y guardado del CVU y alias.

**Mi Actividad**
- Historial de transacciones paginado (10 por página).
- Filtros por período (hoy, ayer, semanas, meses) y por tipo (ingresos / egresos).
- Búsqueda por palabras clave en el título de la transacción.
- Botón para limpiar todos los filtros aplicados.

---

### Sprint 4 — Pago de Servicios

**Servicios disponibles**
- Listado completo de servicios sin paginación.
- Buscador por título de servicio.

**Pago de servicio**
- Ingreso del número de cuenta del servicio.
- Selección de medio de pago existente o agregado en el momento.
- Pantalla de resultado con resumen de transacción.
- Mensaje de error ante fondos insuficientes.

---

## Estructura del Proyecto

```
digital-money-house/
├── public/
├── src/
├── .env.example
├── Dockerfile
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Deploy

El proyecto está dockerizado y desplegado en Vercel.

🔗 [https://digital-money-house-one.vercel.app](https://digital-money-house-one.vercel.app)
