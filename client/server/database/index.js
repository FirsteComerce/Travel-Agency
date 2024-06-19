const mongoose = require('mongoose')
const mongo_url ='mongodb://127.0.0.1:27017/Travel'

mongoose.connect(mongo_url,{ useUnifiedTopology: true, useNewUrlParser: true })
                .then(() => console.log('MongoDB connected !'))
                .catch((e) => console.error(e));
const db = mongoose.connection;

module.exports = db