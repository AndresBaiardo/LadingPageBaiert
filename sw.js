//Asignr un nombre y version al cache
const CACHE_NAME = 'v1_cache_102';

//Archivos a guardar 
var urlsToCache =[
    './',//Todo lo del directorio actual
    './css',
    './css/Baiert.css',
    './css/bootstrap.min.css',
    './css/index.css',   
    './img',
    './img/BAIERT 128.png',
    './img/BAIERT 144.png',
    './img/BAIERT 256.png',
    './img/BAIERT 512.png',
    './img/BAIERT 128px.png',
    './img/BAIERT 120px.png',
    './img/BAIERT (2).png',
    './img/Zombie.webp',
    './img/Aaju.webp',
    './img/cyber.webp',
    './img/LOGO.JPG',
    './img/iconovideojuego.ico',
    './img/LOGO2-removebg-preview.ico',
    './img/LOGO2-removebg-preview.png',
    './img/Fondo 2.png',
    './img/Fondo 1.png',
    './img/hardware500.png',
    './img/hardware.jpg',
    './img/laboratorio500.png',
    './img/iconovideojuego.png',
    './img/Hospital500.png',
    './img/personajes.png',
    './img/E10.png',
    './img/libro.png',
    './img/52311202466_d5942182af_o.jpg',
    './img/facebook.svg',
    './img/Hospital.jpg',
    './js',
    './js/bootstrap.bundle.min.js',
    './almacenamiento.js',
    './Baiert.html',
    './index.html',
    './index.js',
    './index.ts',
    './jquery.js',
    './main.js',
    './manifest.json',
    './sw.js',
    './firebase.js',
    './datos.html'
];

//Evento install

self.addEventListener('install', e=>{
    e.waitUntil(//espera a que abra el cache
        caches.open(CACHE_NAME)//Aabrimos el cahe, regresa una promesa 
        .then(cache=>{
            cache.addAll(urlsToCache)//Regresmos los elementos del arreglo 
            .then(()=>{
                self.skipWaiting();//Espera a que se llene el cache 
            })
        })
        .catch(err=>{
            console.log('No se ha registrado el cache',err);
        })
    )
})

//Evento activate
//Este activa el SW y una vez que se active trabaje offline 

self.addEventListener('activate',e =>{
    const cacheWhitelist = [CACHE_NAME]//Vamos a guardar todos los elementos que viene del cache original
    //primero limpiamos al cache para quitar elementos que no se necesitan o sean redudantes 
    e.waitUntil(
        caches.keys()//El keys lo que hace es recoger todos los elementos que hay del cache
        .then(cacheNames => {
            return Promise.all(
                //map() nos permite recorrer un array
                cacheNames.map(cacheName => {
                    //indexOf es para buscar dentro del cache
                    //lo siguente es buscar un elementos y si no se encuentra borrarlo de la cache o si redudante
                    if(cacheWhitelist.indexOf(cacheName)=== -1){
                        //borrar elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                    
                })
            );
        })
        //avtivar cahe
        .then(() => {
            self.clients.claim();//Activa la cache actual Withelist
        })
    );
})


//Evento fetch
self.addEventListener('fetch',e => {
    e.respondWith(
        caches.match(e.request)//Busca la informacion en el cache
        .then(res => {
            if(res){
                //Si se encuentra en el cahe 
                //devuelve los datos desde cahe
                return res;
            }
            //En caso de que no se encuentre en el cahe la recupero desde el servidor
            return fetch(e.request);
        })
    );
});