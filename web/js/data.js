/* ============================================================
   NUESTRA HISTORIA ✿ DATOS EDITABLES
   ------------------------------------------------------------
   ✏️  Podés cambiar TODO acá:
   - CONFIG.ella   → el nombre / apodo de tu novia
   - CONFIG.fecha  → qué se celebra
   - CONFIG.invitacion → el plan que vas a armar
   - SLIDES        → cada SECCIÓN tiene una POSTAL con texto.
        ✔ UNA foto sola:        { type, src, cap, title, text, note }
✔ VARIAS fotos juntas:  { cap, title, text, note, photos:[
             "media/img/xxx.jpg",
             { src:"media/img/yyy.jpg", t:"minitítulo", d:"descripción", note:"frase" },
             ...
           ]}
         Cada foto puede llevar su propio t/d/note; si no, usa el de
         la sección. Todas las fotos de una sección se muestran JUNTAS
         en un collage dentro de la postal. Para AGREGAR fotos a una
         sección, sumá una entrada al array `photos` (videos MP4 también
         van, y se reproducen en bucle).
   ============================================================ */

const CONFIG = {
  ella: "Martina Yacob",
  fecha: "26 de Septiembre de 2026",
  introSaludo: "Cumpleaños",
  introTexto: "Hoy cumplís años, tu primer cumpleaños juntos y quiero dedicarte esto que preparé con todo mi amor. Gracias por ser la mejor compañera y por hacerme tan feliz.",
  invitacion: {
    cap: "Capítulo Final — El próximo destino",
    title: "Te invito a…",
    texto: "GUARDAR: acá va el plan que preparaste para ella.",
    detalle: "",
    fecha: "— día y hora que le quieras regalar —",
    lugar: "",
    nota: "este es solo el primer minuto de todo lo que todavía quiero vivir con vos.",
  },
};

const SLIDES = [

  /* ---------- 1 · EL PRINCIPIO ---------- */
  {
    cap: "Capítulo I · El Principio",
    title: "Donde todo comenzó",
    text: "Algún lugar, algún instante, mi mundo cambió de color. Ahí estaba yo descubriendo que tu sonrisa podía ser mi lugar favorito del universo.",
    note: "la primera vista",
    photos: [
      { src: "media/img/1.jpg",
        t: "Primeros mates en casa",
        d: "30 de diciembre de 2025, un día que nos conocimos por primera vez y el día que me encantaste.",
        note: "la primera vista" },
      { src: "media/img/2.jpg",
        t: "Nuestras aventuras en patines",
        d: "Ese día no lo sabía, pero ya me estaba enamorando de vos.",
        note: "el primer latido" },
      { src: "media/img/3.jpg",
        t: "El primer destello",
        d: "Una foto cualquiera, un recuerdo que no lo parecía. Ahí estabas vos, y mi mundo empezó a girar distinto.",
        note: "cuando lo dijo la mirada" },
      
    ],
  },

  /* ---------- 2 · LOS PRIMEROS SUEÑOS ---------- */
  {
    type: "img", src: "media/img/IMG_2255.jpg",
    cap: "Capítulo II · Los Primeros Sueños",
    title: "Los primeros sueños",
    text: "Empezamos a soñar en conjunto: lugares por conocer, planes por tachar, y dos corazones aprendiendo a latir al mismo compás.",
    note: "soñando despiertos",
  },

  /* ---------- 3 · MOMENTOS EN MOVIMIENTO ---------- */
  {
    cap: "Capítulo III · Momentos en Movimiento",
    title: "Momentos en movimiento",
    text: "De repente el tiempo dejó de pasar solo y empezó a pasar con nosotros. Cada segundo contigo se siente como una celebración.",
    note: "♪ bailando con vos",
    photos: [
      { src: "media/vid/IMG_2381.mp4", poster: "media/img/IMG_1897.jpg",
        t: "El tiempo que celebramos juntos",
        d: "De repente el tiempo dejó de pasar solo y empezó a pasar con nosotros. Cada segundo contigo se siente como una celebración.",
        note: "♪ un fragmento de nuestra canción" },
      { src: "media/vid/IMG_2382.mp4", poster: "media/img/IMG_1897.jpg",
        t: "Risas que se hacen recuerdo",
        d: "Así nos dan las horas: riendo, mirándonos, y dejando que la cámara guarde lo que el corazón ya no quiere soltar.",
        note: "esa risa tuya, mi canción favorita" },
      { src: "media/vid/IMG_2383.mp4", poster: "media/img/IMG_1897.jpg",
        t: "Bailar con vos",
        d: "No importa la música. Si la bailo con vos, ya es mi canción preferida. En tus brazos el tiempo se tomó vacaciones para siempre.",
        note: "moviéndonos despacio" },
      { src: "media/vid/IMG_2384.mp4", poster: "media/img/IMG_1897.jpg",
        t: "Tu magia en cámara",
        d: "Me paso la vida tratando de capturar lo que no se captura: tu brillo, tu luz, la forma en que me mirás y el mundo se queda en silencio.",
        note: "me dejo de la luz de tus ojos" },
      { src: "media/vid/IMG_2385.mp4", poster: "media/img/IMG_1897.jpg",
        t: "El amor en 10 segundos",
        d: "Así de corto es un recuerdo y así de infinito se siente. Cada segundo de video no alcanza, pero me alcanza con saber que lo compartimos.",
        note: "guardado para siempre" },
    ],
  },

  /* ---------- 4 · CRECIENDO JUNTOS ---------- */
  {
    cap: "Capítulo IV · Creciendo Juntos",
    title: "Creciendo juntos",
    text: "Descubrí que hogar no es un lugar, es una persona. Los días simples se volvieron extraordinarios desde que te tengo al lado.",
    note: "mi lugar seguro",
    photos: [
      { src: "media/img/IMG_3148.jpg",
        t: "Nuestro hogar",
        d: "Descubrí que hogar no es un lugar, es una persona. Y vos tenés el don de hacerme sentir en casa con solo estar.",
        note: "mi lugar seguro" },
      { src: "media/img/IMG_4494.jpg",
        t: "Pequeños grandes momentos",
        d: "Los días simples se volvieron extraordinarios desde que te tengo al lado. Una tarde, un café, tu mano… y eternidad de más.",
        note: "lo simple, que es lo sagrado" },
      { src: "media/img/IMG_4495.jpg",
        t: "Así nos miramos",
        d: "En tus ojos encontré una respuesta: la certeza de que no hay manera de mirarte y no quedarme. Por eso te miro tanto.",
        note: "y siempre quiero mirarte más" },
      { src: "media/img/IMG_4522.jpg",
        t: "Vos, luz y risa",
        d: "Hay días que no necesito el sol: ponés vos. Que no nos falte nunca esta forma de mirarnos, la que hace que todo valga la pena.",
        note: "mi astro favorito" },
      { src: "media/img/IMG_4524.jpg",
        t: "Instantes de nosotros",
        d: "No sé qué tienen estos momentos que los guardo como tesoros. Tal vez que son nuestros, y juntos lo son todo.",
        note: "nuestro" },
      { src: "media/img/IMG_4525.jpg",
        t: "El mejor plan del mundo",
        d: "Mi plan perfecto es uno solo: pasar tiempo con vos donde sea, cuando sea, como sea. Lo demás es solo decorado.",
        note: "plan: vos" },
      { src: "media/img/IMG_4526.jpg",
        t: "Mundo mío",
        d: "Entre el caos y la rutina, sos mi remanso. Cada foto tuya me recuerda lo afortunado que soy de ser parte de tu vida.",
        note: "mi mundo" },
      { src: "media/img/IMG_4532.jpg",
        t: "El regalo de tu sonrisa",
        d: "La sonrisa más linda del mundo, y todavía no me acostumbro a tenerla tan cerca. Qué suerte la mía.",
        note: "sonreí mucho, amor" },
    ],
  },

  /* ---------- 5 · NUESTRA CÓMPLICE ---------- */
  {
    cap: "Capítulo V · Nuestra Cómplice",
    title: "Mi mejor cómplice",
    text: "Entre bromas y miradas cómplices, construimos un universo donde solo existimos vos y yo. Un lugar al que siempre quiero volver.",
    note: "tuya y mía",
    photos: [
      { src: "media/vid/IMG_4784.mp4", poster: "media/img/IMG_4532.jpg",
        t: "Nuestro juego",
        d: "Entre bromas y miradas cómplices, construimos un universo donde solo existimos vos y yo. Un lugar al que siempre quiero volver.",
        note: "mi mejor cómplice" },
      { src: "media/img/IMG_4788.jpg",
        t: "Nosotros contra el mundo",
        d: "Sea lo que sea que venga, sé que al lado tuyo es suficiente. Sos mi equipo, mi refugio y mi alegría más bonita.",
        note: "tuya y mía" },
      { src: "media/img/IMG_5059.jpg",
        t: "El arte de querernos",
        d: "Nos vamos pintando los días uno a otro: yo tus sonrisas descuidadas, vos mis silencios con miedo. Quedó una obra maestra.",
        note: "obras de arte, nosotros dos" },
      { src: "media/img/IMG_5080.jpg",
        t: "Café, magia y vos",
        d: "Hay rituales que vuelven rituales: un día común, un lugar cualquiera, y ahí estás vos convirtiéndolo en mi recuerdo preferido.",
        note: "siempre elegirte para todo" },
      { src: "media/img/IMG_5235.jpg",
        t: "El universo conspira",
        d: "Dicen que el universo conspira para que las cosas pasen. No sé si conspiró, pero hizo bien en cruzarnos los caminos.",
        note: "y se me acomodó el mundo" },
      { src: "media/img/IMG_5361.jpg",
        t: "Tiempo de nosotros",
        d: "El mejor regalo que podemos darnos es tiempo: el nuestro, lento, de manos tomadas y de planes que empiezan con 'y si…'.",
        note: "tengo todo el tiempo del mundo para vos" },
    ],
  },

  /* ---------- 6 · AVENTURAS ---------- */
  {
    cap: "Capítulo VI · Aventuras",
    title: "Aventuras",
    text: "Con vos hasta lo cotidiano se vuelve una aventura que quiero volver a protagonizar. Todos los mapas llevan a tu sonrisa.",
    note: "te llevo a todos lados",
    photos: [
      { src: "media/vid/IMG_5392.mp4", poster: "media/img/IMG_5361.jpg",
        t: "Menos mal que siempre hacés lo imposible",
        d: "Además de amarte, admiro cómo vivís. Con vos hasta lo cotidiano se vuelve una aventura que quiero volver a protagonizar.",
        note: "a tu lado todo es más lindo" },
      { src: "media/vid/IMG_5429.mp4", poster: "media/img/IMG_5361.jpg",
        t: "Nuestro viaje empieza acá",
        d: "Todos los mapas llevan a tu sonrisa. Donde vayamos a parar la historia, quiero que sea con vos de copiloto (y de todo).",
        note: "destino: cualquier lugar con vos" },
      { src: "media/img/IMG_5430.jpg",
        t: "De vacaciones con vos",
        d: "Descubrí que no hace falta ir lejos: si estás vos, ya estoy de viaje. Aunque el paisaje sea hermoso, vos sos el paisaje.",
        note: "te llevo a todos lados" },
      { src: "media/img/IMG_5434.jpg",
        t: "Mapas del corazón",
        d: "Cada sitio que pisamos juntos queda marcado en mi memoria con una banderita roja: 'acá fui feliz con ella'.",
        note: "mi lugar en el mundo sos vos" },
      { src: "media/img/IMG_5435.jpg",
        t: "Ese no sé qué",
        d: "No sé si es el mar, el aire o el descanso… pero mirándote así, entiendo perfecto por qué te elegí y por qué te elijo todos los días.",
        note: "te elegiría otra vez, siempre" },
      { src: "media/vid/IMG_5436.mp4", poster: "media/img/IMG_5435.jpg",
        t: "Catch & reel",
        d: "De todas las personas del planeta, yo te pesqué un día a vos… y gracias a Dios, este anzuelo no te suelta nunca más.",
        note: "mi mejor historia de amor" },
      { src: "media/img/IMG_5553.jpg",
        t: "Tu ángel, soñarme",
        d: "Mi misión pisar el mundo rodeado de tu belleza y de tu bondad. Sos lo más hermoso que me pasó, y eso lo sabés.",
        note: "sigue soñando, que soñás divino" },
      { src: "media/img/IMG_5589.jpg",
        t: "Sorpresas que quedan",
        d: "Me encanta planearte sorpresas porque tu cara de asombro es pura magia. Este viaje es una de ellas, y hay más en camino.",
        note: "👀 esto recién empieza" },
    ],
  },

  /* ---------- 7 · A TODA INTENSIDAD ---------- */
  {
    cap: "Capítulo VII · A Toda Intensidad",
    title: "A toda intensidad",
    text: "Con vos la vida va sin frenos y a toda velocidad. Todo, repito, todo vale la pena si lo vivo con vos.",
    note: "y que no se frene nunca",
    photos: [
      { src: "media/vid/IMG_5592.mp4", poster: "media/img/IMG_5589.jpg",
        t: "Aguantá el corazón 🎢",
        d: "Con vos la vida va sin frenos y a toda velocidad. Todo, repito, todo vale la pena si lo vivo con vos.",
        note: "y que no se frene nunca" },
      { src: "media/img/IMG_5675.jpg",
        t: "El viaje fue el destino",
        d: "Si de algo estoy seguro es que el destino siempre fuiste vos. Todo lo demás era solo el camino para llegar a encontrarte.",
        note: "te fuiste y volviste, mejor" },
      { src: "media/vid/IMG_5917.mp4", poster: "media/img/IMG_5675.jpg",
        t: "Otro capítulo nuestro",
        d: "Los que pensamos que cada año con vos es el mejor, hasta que llega el próximo y nos demuestra que siempre se puede más.",
        note: "mejores cada día" },
      { src: "media/img/IMG_5934.jpg",
        t: "El plan perfecto",
        d: "Mi plan favorito del verano no aparece en ninguna agenda: es el que tiene tu nombre, tu sonrisa y un lugar con vos.",
        note: "plan confirmado para siempre" },
      { src: "media/img/IMG_5941.jpg",
        t: "Verte reír",
        d: "Si me preguntan qué quiero ser de grande: quiero ser la razón de tus carcajadas y el cómplice de tus locuras.",
        note: "reíte, que se te nota la belleza" },
    ],
  },

  /* ---------- 8 · LOS GRANDES MOMENTOS ---------- */
  {
    cap: "Capítulo VIII · Los Grandes Momentos",
    title: "Celebrando",
    text: "Cada celebración con vos se siente como un premio por habernos encontrado. Hoy, el premio más grande: sos vos.",
    note: "festejando lo nuestro",
    photos: [
      { src: "media/vid/IMG_5943.mp4", poster: "media/img/IMG_5941.jpg",
        t: "Celebrando",
        d: "Cada celebración con vos se siente como un premio por habernos encontrado. Hoy, el premio más grande: sos vos.",
        note: "festejando lo nuestro" },
      { src: "media/vid/IMG_5944.mp4", poster: "media/img/IMG_5941.jpg",
        t: "Quedando en la memoria",
        d: "Del recuerdo, lo que importa es lo que sentimos. Y con vos, la memoria siempre guarda el dos por ciento más feliz.",
        note: "que sigan los recuerdos" },
    ],
  },

  /* ---------- 9 · EL GRAN DÍA ---------- */
  {
    cap: "Capítulo IX · El Gran Día",
    title: "El día perfecto",
    text: "Algunos días son perfectos porque sí. Y vos le ponés el 'sí': hoy, tu día, es su día más lindo del año.",
    note: "feliz cumple, amor",
    photos: [
      { src: "media/img/0f615278-d712-4bd6-8b84-d5889881e0f6.jpg",
        t: "El día perfecto",
        d: "Algunos días son perfectos porque sí. Y vos le ponés el 'sí': hoy, tu día, es su día más lindo del año.",
        note: "que sea tuyo, como siempre" },
      { src: "media/img/235f8612-1438-4754-b540-29835462efa3.jpg",
        t: "Vos merecés todo",
        d: "Si los deseos se soplan, que se cumplan todos. Te deseo tanta felicidad como la que me das, y eso es mucho, muchísimo.",
        note: "feliz cumple, amor" },
    ],
  },

  /* ---------- 10 · LO QUE NO SE OLVIDA ---------- */
  {
    cap: "Capítulo X · Lo que no se olvida",
    title: "Instante congelado",
    text: "Así me gustaría que se quedara el tiempo: congelado, en un instante donde todavía quedan años por vivir a tu lado.",
    note: "con cariño, nosotros",
    photos: [
      { src: "media/img/307D8FEF-C417-4F3C-BF38-3D3C0A18B68D.jpg",
        t: "Nuestra entrevista",
        d: "De todas nuestras entrevistas y juegos de preguntas, la conclusión siempre es la misma: no puedo dejar de pensar en vos.",
        note: "la respuesta siempre es vos" },
      { src: "media/img/333A4371-E199-4BAC-9E1A-D6F0EB06F54F.jpg",
        t: "Dibujándonos la vida",
        d: "Nos fuimos dibujando un mundo a nuestro gusto, hasta que lo mejor de todos los cuadros terminó siendo el otro.",
        note: "mi obra favorita" },
      { src: "media/img/3BAC3ADE-051B-4B5E-B64A-7C7B5171FB7B.jpg",
        t: "Instante congelado",
        d: "Así me gustaría que se quedara el tiempo: congelado en un instante donde todavía quedan años por vivir a tu lado.",
        note: "pausa: mirándonos" },
      { src: "media/img/732DFDE9-6CC6-42F8-BFA8-2C467A927FB3.jpg",
        t: "Del amor en pantalla",
        d: "Cada pixel de estas fotos late. Porque lo que sentimos no se filma, pero se nota: en la mirada, en la risa, en todo.",
        note: "clásico instantáneo" },
    ],
  },

  /* ---------- 11 · Y VIVIRÁN FELICES ---------- */
  {
    cap: "Capítulo X · Lo que no se olvida",
    title: "…y fueron felices",
    text: "La mejor parte de la historia es la que todavía falta por escribir con vos.",
    note: "to be continued…",
    photos: [
      { src: "media/img/7525C34D-0F42-473B-AEC4-B77E710978A5.jpg",
        t: "Nuestro sello",
        d: "Un antes y un después: todo lo que pasó antes de vos me parece parte de otro guion. Desde que sos parte de mi historia, escribo mejor.",
        note: "con cariño, nosotros" },
      { src: "media/img/C74563E9-7B84-4CB7-B65B-8E979C4DABBC.jpg",
        t: "La foto que lo dice",
        d: "Dicen que una imagen vale más que mil palabras. Entonces dejo que esta hable por mí: te amo, hoy, mañana y siempre.",
        note: "te amo completamente" },
      { src: "media/img/D2793CF8-F524-42AF-8DD7-91B58A08102D.jpg",
        t: "…y fueron felices",
        d: "Y así, entre tantos capítulos, descubrí que la mejor parte de la historia es la que todavía falta por escribir con vos.",
        note: "to be continued…" },
    ],
  },
];

/* ============================================================
   SLIDE FINAL: LA INVITACIÓN
   (editala en CONFIG.invitacion más arriba ↑)
   ============================================================ */
SLIDES.push({
  type: "invitacion",
  cap: CONFIG.invitacion.cap,
  title: CONFIG.invitacion.title,
  text: CONFIG.invitacion.texto,
  detalle: CONFIG.invitacion.detalle,
  fecha: CONFIG.invitacion.fecha,
  lugar: CONFIG.invitacion.lugar,
  note: CONFIG.invitacion.nota,
  replay: true,
});