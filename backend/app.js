import express from 'express';
import morgan from 'morgan';

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
  res.send("Hello World");
});

export default app;
