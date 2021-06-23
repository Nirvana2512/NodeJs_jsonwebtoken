let express = require('express');
let mongoose = require('mongoose');

const routes = require('./api/routes')
let app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

mongoose.connect('mongodb://localhost/test_db_NodeJs_Mongoose', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});

routes(app);

app.listen(5500, () => {
    console.log('Server is running on port 5500');
});