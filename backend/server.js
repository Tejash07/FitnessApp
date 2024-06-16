const express = require('express')
const mongoose = require('mongoose')

const AuthRoute = require('./routes/Auth')





const app = express();
app.use(express.json())

mongoose.connect('mongodb://localhost/FitnessUsers', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', (error) => { console.log(error) })
db.once('open', () => { console.log("-- CONNECTED --") })


const cors = require('cors');

//http://194.195.215.144:3000

const connection = 'http://localhost:3000'



const corsOptions = {





    origin: connection,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use('/user', AuthRoute)



app.get('/', async (req, res) => {

    res.send('BASE PAGE')
    console.log("Got the base to work")
    
    })



app.get('/api', async (req, res) => {

res.send('HELLO WORLD')

})

//app.get('/register', AuthRoute)
//app.post('/register', AuthRoute)


app.listen(5000, () => { console.log("Server Started") })



