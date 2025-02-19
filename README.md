# 🚀 ATOM Challenge - Gestión de Tareas

Este proyecto es una aplicación de gestión de tareas desarrollada con **Angular, Firebase Firestore y Firebase Hosting**. Permite agregar, editar, eliminar y marcar tareas como completadas.

---

## 🚀 URL Para acceso al proyecto en Firebase Hosting
```sh
https://atom-challenge-backend.web.app/
```

---

## 📌 Tecnologías Utilizadas
- **Angular 15** → Framework frontend principal
- **Firebase Firestore** → Base de datos en tiempo real
- **Firebase Hosting** → Para el despliegue de la aplicación
- **Material Angular** → Diseño de interfaz (Material UI)
- **SCSS** → Estilos responsivos y personalizados

---

## ⚙️ Decisiones de Diseño y Desarrollo

### **1️⃣ Diseño Responsivo**
- Se utilizó **Material Angular** para garantizar una interfaz moderna y responsiva.
- Se aplicó `@media (max-width: 768px)` en SCSS para optimizar la vista en móviles.

### **2️⃣ Persistencia de Datos**
- Se usó **Firebase Firestore** como base de datos.
- Cada tarea tiene los campos: `title`, `description`, `completed`, `createdAt`, `deleted`.
- Implementamos eliminación **lógica** (`deleted: true` en vez de borrar datos).

### **3️⃣ Autenticación**
- Se usa autenticación simple sin contraseña: solo ingresando el correo se valida en Firestore.
- **No se usa Firebase Authentication**, sino Firestore como mecanismo de validación.

### **4️⃣ Funcionalidad Clave**
- **Agregar tareas** con título, descripción y estado (`completed: false` por defecto).
- **Editar tareas** → Cargar los datos en el formulario y cambiar el botón a *Guardar cambios*.
- **Eliminar tareas** de forma lógica (`deleted: true` en Firestore).
- **Persistencia** en Firebase Firestore con operaciones `POST`, `PUT`, `GET`.

---

## 🚀 **Cómo Ejecutar el Proyecto**

### **1️⃣ Instalar dependencias**:
```sh
npm install
```

### **2️⃣ Correr el servidor de desarrollo**
```sh
ng serve
```

### **3️⃣ Desplegar en Firebase Hosting**
```sh
ng build --configuration=production
firebase deploy --only hosting
```

## 📂 **Estructura del Proyecto**
```plaintext
src/
 ├── app/
 │   ├── guards/         # Protección de las rutas de la apliicación
 │   ├── models/         # Modelos TypeScript (Interfaces)
 │   ├── services/       # Servicios para Firebase (Firestore, Auth)
 │   ├── pages/
 │   │   ├── login/      # Pantalla de inicio de sesión
 │   │   ├── tasks/      # Pantalla de gestión de tareas
 ├── assets/             # Iconos, imágenes
 ├── environments/       # Configuración de Firebase
