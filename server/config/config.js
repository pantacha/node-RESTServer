//Puertos
process.env.PORT = process.env.PORT || 3000;

//Entornos
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Caducidad Token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//Seed de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//BD
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb://cafe-user:123456@ds227740.mlab.com:27740/cafe';
}
process.env.URLDB = urlDB;