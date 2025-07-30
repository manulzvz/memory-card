# 🐸 Amphibia Memory Game - Juego de Memoria con React

Juego de cartas tipo memoria inspirado en la serie animada *Amphibia*, desarrollado con React.  
¡Pon a prueba tu memoria haciendo clic en personajes sin repetir ninguno!

---

## 🎮 ¿Cómo se juega?

- Haz clic en cualquier carta para comenzar el juego.
- Cada clic correcto (personaje nuevo) suma 1 punto.
- Si haces clic en el mismo personaje dos veces, el juego termina.
- ¡Gana si logras hacer clic en los 12 personajes sin repetir!
- Las cartas se reorganizan aleatoriamente después de cada clic.

---

## 🏆 Funcionalidades

- **Contador de puntuación**: muestra la puntuación actual y la mejor (guardada localmente).
- **Diseño responsivo**: adaptable a computadoras, tablets y móviles.
- **Animaciones suaves**: transiciones y efectos al pasar el mouse.
- **Persistencia local**: la mejor puntuación se guarda entre sesiones con `localStorage`.
- **12 personajes únicos**: todos los personajes principales de Amphibia.

---

## ⚙️ Tecnologías utilizadas

- **React 19** con Hooks
- **Vite** para desarrollo rápido y build optimizado
- **CSS3** con `backdrop-filter`, gradientes y diseño moderno
- **ESLint** para mantener calidad del código
- **CSS Grid & Flexbox** para diseño adaptable

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos

- Node.js v16 o superior
- npm o yarn

### Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/manulzvz/memory-card.git
cd memory-card
````

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5174`

### Generar build para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist`.

---

## 📱 Diseño Responsivo

La distribución de las cartas se adapta según el dispositivo:

* **Escritorio**: 4 columnas
* **Tablet**: 3 columnas
* **Móvil**: 2 columnas

---

## 🤝 ¿Quieres contribuir?

¡Contribuciones bienvenidas! Puedes abrir issues o enviar pull requests.

---

## 📄 Licencia

Este proyecto es de código abierto bajo la [Licencia MIT](LICENSE).



