
// Referencias del HTML
const lblOnline   =  document.querySelector('#lblOnline');
const lblOffline  =  document.querySelector('#lblOffline');
const btnEnviar   =  document.querySelector('#btnEnviar');
const txtMensaje  =  document.querySelector('#txtMensaje');

console.log('Socket-client.js');
 
const socket = io();

socket.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
})

btnEnviar.addEventListener('click',()=>{
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id : '1234',
        fecha : new Date().getTime()
    }
    socket.emit('enviar-mensaje',payload,(resp) => {
        console.log('Desde el server: ',resp);
    });
});

