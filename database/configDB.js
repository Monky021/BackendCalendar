const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('DB conectada');

    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de inicializar la DB');
    }
}

module.exports = {
    dbConnection
}