
  
  //Lanzamiento del sw en la app
  
  if('serviceWorker'in navigator){
    console.log('Puedes usar Sw');
    navigator.serviceWorker.register('./sw.js')
        .then(res=>console.log ('Service worker ok',res))
        .catch(err=>console.log('No hay service worker', err));
    
  }else{
    console.log('No puedes usar los service Worker')
  }