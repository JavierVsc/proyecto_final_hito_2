export const photos = Object.freeze({
  notebook: 'https://images.unsplash.com/photo-1659135890084-930731031f40?w=1100&q=85&fit=crop',
  celular: 'https://images.unsplash.com/photo-1509745651274-ddeb337c854a?w=1100&q=85&fit=crop',
  consola: 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=1100&q=85&fit=crop',
  audifonos: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1100&q=85&fit=crop',
  monitor: 'https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?w=1100&q=85&fit=crop',
  teclado: 'https://images.unsplash.com/photo-1674621703172-ef68b33e52da?w=1100&q=85&fit=crop',
  mouse: 'https://images.unsplash.com/photo-1662323861979-0538474387e3?w=1100&q=85&fit=crop',
  reloj: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=1100&q=85&fit=crop',
  camara: 'https://images.unsplash.com/photo-1654701502319-344c0d50677f?w=1100&q=85&fit=crop',
});

export const categories = ['Notebooks', 'Celulares', 'Gaming', 'Audio', 'Monitores', 'Accesorios'];

export const initialProducts = [
  {id: 1, brand:'Computación', name:'Notebook ultraligero 13”', price:649990, cat:'Notebooks', tag:'DESTACADO', image:photos.notebook, stock:5, desc:'Notebook liviano para estudio y productividad. Diseño compacto, teclado de tamaño completo y excelente portabilidad.'},
  {id: 2, brand:'Telefonía', name:'Smartphone pantalla OLED', price:489990, cat:'Celulares', tag:'NOVEDAD', image:photos.celular, stock:6, desc:'Smartphone con pantalla de alta calidad, cámara avanzada y conectividad para el día a día.'},
  {id: 3, brand:'Entretenimiento', name:'Consola de videojuegos', price:529990, cat:'Gaming', tag:'POPULAR', image:photos.consola, stock:4, desc:'Consola de sobremesa para disfrutar juegos, entretenimiento y experiencias inmersivas.'},
  {id: 4, brand:'Audio', name:'Audífonos inalámbricos', price:79990, cat:'Audio', tag:'DESTACADO', image:photos.audifonos, stock:15, desc:'Audífonos de diadema inalámbricos para música, estudio y entretenimiento.'},
  {id: 5, brand:'Pantallas', name:'Monitor gaming panorámico', price:279990, cat:'Monitores', tag:'NOVEDAD', image:photos.monitor, stock:7, desc:'Monitor panorámico ideal para una estación de trabajo o configuración gaming.'},
  {id: 6, brand:'Periféricos', name:'Teclado mecánico RGB', price:69990, cat:'Accesorios', tag:'POPULAR', image:photos.teclado, stock:12, desc:'Teclado mecánico con iluminación multicolor y respuesta táctil.'},
  {id: 7, brand:'Periféricos', name:'Mouse gamer ergonómico', price:34990, cat:'Accesorios', tag:'', image:photos.mouse, stock:16, desc:'Mouse orientado a sesiones prolongadas de juego o trabajo.'},
  {id: 8, brand:'Wearables', name:'Reloj inteligente deportivo', price:119990, cat:'Accesorios', tag:'NOVEDAD', image:photos.reloj, stock:8, desc:'Reloj inteligente con pantalla táctil y monitoreo de actividad.'},
  {id: 9, brand:'Fotografía', name:'Cámara digital mirrorless', price:719990, cat:'Accesorios', tag:'DESTACADO', image:photos.camara, stock:3, desc:'Cámara digital compacta con lente intercambiable para fotografía y vídeo.'}
];
