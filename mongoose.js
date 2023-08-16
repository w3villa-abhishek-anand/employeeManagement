const mongoose = require('mongoose');

class MongoDB {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect('mongodb+srv://meabhii21:8wsARZJB6XBgaedm@employeemanagement.vxmqcxp.mongodb.net/', {
                useNewUrlParser: true
            })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error', err)
            })
    }
}

module.exports = new MongoDB()