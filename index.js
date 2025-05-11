const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const subcategories = [
  {
    subcategory_Name: "Wooden Furniture & Sculptures",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-jonathanborba-3316922.jpg?updatedAt=1746960014712",
    description: "Timeless craftsmanship meets nature’s charm — discover elegant furniture and hand-carved wooden sculptures made to elevate any space."
  },
  {
    subcategory_Name: "Wooden Home Decor",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-charlotte-may-5824520.jpg?updatedAt=1746960014527",
    description: "Warm, earthy, and artfully crafted — explore decor that brings rustic beauty and natural textures into your home."
  },
  {
    subcategory_Name: "Wooden Utensils and Kitchenware",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-pavel-danilyuk-6996085.jpg?updatedAt=1746960012529",
    description: "Functional meets artisanal — our handcrafted wooden kitchenware blends tradition, utility, and eco-conscious living."
  },
  {
    subcategory_Name: "Jute Home Decor",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-samjjohnson-15601758.jpg?updatedAt=1746960010695",
    description: "Add a soft, sustainable touch with jute-crafted pieces — perfect for cozy corners, earthy aesthetics, and conscious styling."
  },
  {
    subcategory_Name: "Jute Kitchenware & Utensils",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-charlotte-may-5824485.jpg?updatedAt=1746960015165",
    description: "Rustic and refined — our jute kitchen collection offers durable, eco-friendly accents for everyday elegance."
  },
  {
    subcategory_Name: "Jute and Wooden Jewellery",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-theplanetspeaks-10029928.jpg?updatedAt=1746960014137",
    description: "Wear nature with pride — handcrafted jute and wooden jewelry designed for the bold, the earthy, and the inspired."
  }
];


    

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
    // const categoriesCollection = database.collection("categories");


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