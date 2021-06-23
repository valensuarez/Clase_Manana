//indexjs
const app= require('./config/server');
const connection= require('./config/connectiondb');

const rutas= require('./app/routers/login_registro.js');
rutas(app);

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto: ', app.get('port'));
})

