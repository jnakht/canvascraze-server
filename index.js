const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





    

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.almgwwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const database = client.db("canvascrazeDB");
    const craftsCollection = database.collection("crafts");
    const newLetterEmailCollection = database.collection("newsletters");


    app.post('/arts', async(req, res) => {
        const newCraft =  req.body;
        const result = await craftsCollection.insertOne(newCraft);
        res.send(result);
    })
    app.post('/newsletters', async(req, res) => {
      const newEmail = req.body;
      const result = await newLetterEmailCollection.insertOne(newEmail);
      res.send(result);
    })
    // app.post('/test', async(req, res) => {
    //   const testData = req.body;
    //   const result = await newLetterEmailCollection.insertOne(testData);
    //   console.log('test hitting the server', testData, result);
    //   res.send(result);
    // })

    app.get('/arts', async(req, res) => {
        const cursor = craftsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/arts/:email', async(req, res) => {
      const email = req.params.email;
      const query = {email: `${email}`};
      const result = await craftsCollection.find(query).toArray();
      res.send(result);
    })

    // get random 6 data
    app.get('/random', async(req, res) => {
      const random = await craftsCollection.aggregate([{$sample: {size: 20}}]).toArray();
      res.send(random);
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);












app.get('/', (req, res) => {
    res.send("canvascraze server is running now...");
});

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});