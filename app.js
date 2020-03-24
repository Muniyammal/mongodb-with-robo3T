const express = require('express');
const logger = require('morgan'); 
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


dotenv.config();
mongoose.Promise =global.Promise;  
mongoose.connect('mongodb://localhost/apiproject');

const app = express();
const users = require('./routes/users');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/users',users);
app.use((req,res,next)=> {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next)=>{
    const error =app.get('env') === 'development' ? err :{};
    const status = err.status || 500;
    res.json({
        error : {
              message: error.message
        }
    });

    console.log(err);
});

const port =process.env.PORT ||1234;
app.listen(port, ()=> console.log(`server is ready to use on port ${port}`));
