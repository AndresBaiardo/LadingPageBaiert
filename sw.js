//Asignr un nombre y version al cache
const CACHE_NAME = 'v1_cache_102';

//Archivos a guardar 
var urlsToCache =[
    './',//Todo lo del directorio actual
    './css/Baiert.css',
    './css/bootstrap.css',
    './css/bootstrap.css.map',
    './css/bootstrap.min.css',
    './css/bootstrap.min.css.map',
    './css/bootstrap.rtl.css',
    './css/bootstrap.rtl.css.map',
    './css/bootstrap.rtl.min.css',
    './css/bootstrap.rtl.min.css.map',
    './css/bootstrap-grid.css',
    './css/bootstrap-grid.css.map',
    './css/bootstrap-grid.min.css',
    './css/bootstrap-grid.min.css.map',
    './css/bootstrap-grid.rtl.css',
    './css/bootstrap-grid.rtl.css.map',
    './css/bootstrap-grid.rtl.min.css',
    './css/bootstrap-grid.rtl.min.css.map',
    './css/bootstrap-reboot.css',
    './css/bootstrap-reboot.css.map',
    './css/bootstrap-reboot.min.css',
    './css/bootstrap-reboot.min.css.map',
    './css/bootstrap-reboot.rtl.css',
    './css/bootstrap-reboot.rtl.css.map',
    './css/bootstrap-reboot.rtl.min.css',
    './css/bootstrap-reboot.rtl.min.css.map',
    './css/bootstrap-utilities.css',
    './css/bootstrap-utilities.css.map',
    './css/bootstrap-utilities.min.css',
    './css/bootstrap-utilities.min.css.map',
    './css/bootstrap-utilities.rtl.css',
    './css/bootstrap-utilities.rtl.css.map',
    './css/bootstrap-utilities.rtl.min.css',
    './css/bootstrap-utilities.rtl.min.css.map',
    './css/index.css',    
    './img/BAIERT 128.png',
    './img/BAIERT 144.png',
    './img/BAIERT 256.png',
    './img/BAIERT 512.png',
    './img/BAIERT 128px.png',
    './img/BAIERT 120px.png',
    './img/Negro y Blanco Calavera Cultura Pop Volante de Halloween.png',
    './img/imagen de pendon.png',
    './img/BAIERT (2).png',
    './img/insta (2).png',
    './img/insta (3).png',
    './img/insta (4).png',
    './img/Propaganda facebook 4.png',
    './img/Propaganda facebook 5.png',
    './img/Propaganda Facebook 3.png',
    './img/Zombie.webp',
    './img/Aaju.webp',
    './img/cyber.webp',
    './img/Para Video.png',
    './img/LOGO.JPG',
    './img/iconovideojuego.ico',
    './img/LOGO2-removebg-preview.ico',
    './img/Promocional Facebook 2.png',
    './img/Propaganda insta 2.png',
    './img/LOGO2-removebg-preview.png',
    './img/Fondo 2.png',
    './img/Fondo 1.png',
    './img/hardware500.png',
    './img/hardware.jpg',
    './img/laboratorio500.png',
    './img/laboratorio.jpg',
    './img/Propaganda insta 1.png',
    './img/pROMOCIONAL1.png',
    './img/iconovideojuego.png',
    './img/Infografia (1).jpg',
    './img/Hospital500.png',
    './img/personajes.png',
    './img/E10.png',
    './img/libro.png',
    './img/baiert 2.png',
    './img/baiert 1.png',
    './img/52311202466_d5942182af_o.jpg',
    './img/sigmund-By-tZImt0Ms-unsplash.jpg',
    './img/facebook.svg',
    './img/Hospital.jpg',
    './js/bootstrap.bundle.js',
    './js/bootstrap.bundle.js.map',
    './js/bootstrap.bundle.min.js',
    './js/bootstrap.bundle.min.js.map',
    './js/bootstrap.esm.js',
    './js/bootstrap.esm.js.map',
    './js/bootstrap.esm.min.js',
    './js/bootstrap.esm.min.js.map',
    './js/bootstrap.js',
    './js/bootstrap.js.map',
    './js/bootstrap.min.js',
    './js/bootstrap.min.js.map',
    './vid/2022-11-06 10-57-32.mkv',
    './vid/Anuncio de nuevo producto para baiert.mp4',
    './vid/BAIERT.EXE.mp4',
    './vid/Cyber Monsters 2-720p.mp4',
    './vid/promocional.mp4',
    './vid/The BackRooms Found GamePlay - Crudo Interactive-720p.mp4',
    './vid/Video de ladingpage.mp4',
    './vid/Woman with cap and jacket. Game character-720p.mp4',
    './Baiert.html',
    './index.html',
    './index.js',
    './index.ts',
    './manifest.json',
    './sw.js',
    './jquery.js'


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