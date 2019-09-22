const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var cors = require('cors');
const URL = "mongodb+srv://user:root@cluster0-2ipaz.mongodb.net/test?retryWrites=true&w=majority";
const db = "moviedb"
var app = Express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended : true}));


app.post("/toys" , (req , res ) => {
    col.insertOne(req.body , (err, result) => {
        console.log(req.body);
        if(err)
        {
            return res.status(500).send(err);
        }
        res.send("posted");
    });
});


app.get("/toys" , (req , res ) => {

    col.find({}).toArray (( err , result) => {
       if(err)
       {
           return res.status(500).send(err);
       }
       console.log("get called");
       console.log(result);
       res.send(result);
    });
})

app.delete("/toy" , (req , res ) => {
    
     const _id = new ObjectId(req.body._id);

    col.deleteOne({ _id : _id}, (err , result ) =>{
        console.log(req.body);

        if(err)
        {
            console.log(error);
        }
        res.send(result);
    })
})



var dbn , col ;
app.listen( 8000 , () => {
    MongoClient.connect(URL , { useNewUrlParser : true} , (err , client) => {

        if(err)
        {
            console.log(err);
        }
        dbn = client.db(db);
        col = dbn.collection("toys");
        console.log("db connected");
    });
});