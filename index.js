const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


const port = process.env.PORT || 5000;



const app = express();

//middle ware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rw41wea.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const statusCollection = client.db('socialMedia').collection('statusOptions');
        const informationCollection = client.db('socialMedia').collection('about')

        app.get('/statusOptions',async(req, res)=>{
            const query = {};
            const status = await statusCollection.find(query).toArray();
            res.send(status);
        });

        app.get('/statusOptions/:id',async(req, res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const status = await statusCollection.findOne(query);
            res.send(status);
        });

        app.post('/statusOptions', async(req, res)=>{
            const status = req.body;
            const result = await statusCollection.insertOne(status);
            res.send(result);
        });

        app.get('/about', async(req, res)=>{
            const query = {};
            const information = await informationCollection.find(query).toArray();
            res.send(information);
        })

        app.post('/about', async(req, res)=>{
            const info = req.body;
            const result = await informationCollection.insertOne(info);
            res.send(result);
        })

    }
    finally{

    }
}
run().catch(console.log);



app.get('/', async(req, res)=>{
    res.send('social media is running')
})
app.listen(port, () => console.log(`social media is on ${port}`))