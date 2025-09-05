# acercándote.org - Sistema Integral para Diagnóstico Organizacional [Frontend]

Este proyecto es el Frontend del Sistema Integral para Diagnóstico Organizacional (SIDO), desarrollando con React y Vite.

En este primer lanzamiento, la aplicación permite recopilar datos sobre bienestar laboral y salud mental. Los usuarios completan un formulario dividido en secciones y envían sus respuestas a la API del SIDO.

Conforme el proyecto se desarrolle más, se incluirán más interfaces y características.

## Características

- Formulario dividido en secciones para facilitar la navegación.
- Validación de datos en tiempo real.
- Diseño responsivo utilizando Tailwind CSS.

## Requisitos

- Node.js (versión 16 o superior)
- npm o yarn

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/econopapi/acercandote.org-sido-frontend.git
   cd acercandote.org-sido-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y define la URL de la API:
   ```env
   VITE_API_URL=http://127.0.0.1:8000/api/v1
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre la aplicación en tu navegador en [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run preview`: Previsualiza la aplicación en modo producción.
- `npm run lint`: Ejecuta ESLint para verificar errores de estilo y sintaxis.

## Estructura del Proyecto

```
.
├── public/                # Archivos estáticos
├── src/                   # Código fuente
│   ├── assets/            # Recursos como imágenes y logos
│   ├── App.jsx            # Componente principal de la aplicación
│   ├── main.jsx           # Punto de entrada de la aplicación
│   ├── index.css          # Estilos globales
├── .env                   # Variables de entorno
├── .gitignore             # Archivos y carpetas ignorados por Git
├── package.json           # Dependencias y scripts del proyecto
├── tailwind.config.js     # Configuración de Tailwind CSS
├── vite.config.js         # Configuración de Vite
└── README.md              # Documentación del proyecto
```

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos modernos.
- **Tailwind CSS**: Framework de CSS para diseño responsivo.
- **React Router**: Manejo de rutas dinámicas.
- **React Select**: Componente para listas desplegables.
- **ESLint**: Herramienta para mantener un código limpio y consistente.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

## Autor
💎 Daniel Limón  
✉️ dani@dlimon.net

---

⭐ Si este proyecto te resultó interesante o útil, dale una estrella en GitHub!