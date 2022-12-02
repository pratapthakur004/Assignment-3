const express=require('express');
const PORT=8888;
const exphbs=require('express-handlebars');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/public'));
// template engines
app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars');
app.set('views','./views');

//routes
const mainRoute = require('./routes/mainRouter')
const userRoute = require('./routes/usersRouter')

app.use("/",mainRoute)
app.use("/user",userRoute);
app.use("*",(req,res)=>{
    res.render("notfound")
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`server work on ${PORT}`)
})