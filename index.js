const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const subcategories = [
  {
    subcategory_Name: "Wooden Furnitures",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-jonathanborba-3316922.jpg?updatedAt=1746960014712",
    description: "Timeless craftsmanship meets nature’s charm — discover elegant furniture and hand-carved wooden sculptures."
  },
  {
    subcategory_Name: "Wooden Home Decor",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-charlotte-may-5824520.jpg?updatedAt=1746960014527",
    description: "Warm, earthy, and artfully crafted — explore decor that brings rustic beauty and natural textures into your home."
  },
  {
    subcategory_Name: "Wooden Kitchenware",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-pavel-danilyuk-6996085.jpg?updatedAt=1746960012529",
    description: "Functional meets artisanal — our handcrafted wooden kitchenware blends tradition, utility, and eco-conscious living."
  },
  {
    subcategory_Name: "Jute Home Decor",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-samjjohnson-15601758.jpg?updatedAt=1746960010695",
    description: "Add a soft, sustainable touch with jute-crafted pieces — perfect for cozy corners, earthy aesthetics."
  },
  {
    subcategory_Name: "Jute Kitchenware",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-charlotte-may-5824485.jpg?updatedAt=1746960015165",
    description: "Rustic and refined — our jute kitchen collection offers durable, eco-friendly accents for everyday elegance."
  },
  {
    subcategory_Name: "Jute and Wooden Jewellery",
    image: "https://ik.imagekit.io/ghlgoepam/New%20Folder/pexels-theplanetspeaks-10029928.jpg?updatedAt=1746960014137",
    description: "Wear nature with pride — handcrafted jute and wooden jewelry designed for the bold, the earthy, and the inspired."
  }
];


const crafts = [
    {
    "itemName": "Galloping Horse Print",
    "subcategoryName": "Potrait",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-17.jpg?update…",
    "price": "75$",
    "rating": "4.8",
    "customization": "yes",
    "processing_time": "2 days",
    "stockStatus": "In Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Stunning portrait capturing the essence of freedom.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Wild Horse Photo",
    "subcategoryName": "Potrait",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-13.jpg?update…",
    "price": "60$",
    "rating": "4.7",
    "customization": "yes",
    "processing_time": "3 days",
    "stockStatus": "Limited Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "A captivating image of a wild stallion in its natural habitat.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Majestic Horse Art",
    "subcategoryName": "Potrait",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-2.jpg?updated…",
    "price": "90$",
    "rating": "4.9",
    "customization": "yes",
    "processing_time": "5 days",
    "stockStatus": "In Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Exquisite art piece showcasing equine beauty and grace.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Horse Sunset Photo",
    "subcategoryName": "Landscape",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-10.jpg?update…",
    "price": "55$",
    "rating": "4.6",
    "customization": "no",
    "processing_time": "2 days",
    "stockStatus": "In Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Breath-taking photo of a horse against a sunset backdrop.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Terracotta Potrait",
    "subcategoryName": "Sculpture",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-13.jpg?update…",
    "price": "120$",
    "rating": "4.5",
    "customization": "yes",
    "processing_time": "7 days",
    "stockStatus": "Out of Stock",
    "name": "Rojoni Klanto",
    "email": "jisan.cse.cu@gmail.com",
    "shortDescription": "Handcrafted terracotta art, truly unique.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Handloom Saree",
    "subcategoryName": "Textile Art",
    "imageURL": "https://5.imimg.com/data5/YM/UQ/JW/SELLER-2094048/terracotta-jewellery…",
    "price": "250$",
    "rating": "4.9",
    "customization": "yes",
    "processing_time": "10 days",
    "stockStatus": "In Stock",
    "name": "Rojoni Klanto",
    "email": "jisan.cse.cu@gmail.com",
    "shortDescription": "Exquisite handloom saree with traditional motifs.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Abstract Horse Painting",
    "subcategoryName": "Abstract Art",
    "imageURL": "https://i.imgur.com/l2a9Mkz.jpg",
    "price": "180$",
    "rating": "4.7",
    "customization": "yes",
    "processing_time": "5 days",
    "stockStatus": "In Stock",
    "name": "Md. Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Modern abstract interpretation of a horse.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Digital Horse Art",
    "subcategoryName": "Digital Prints",
    "imageURL": "https://i.imgur.com/l2a9Mkz.jpg",
    "price": "40$",
    "rating": "4.6",
    "customization": "no",
    "processing_time": "1 day",
    "stockStatus": "In Stock",
    "name": "Md. Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "High-resolution digital print for modern decor.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Horse Silhouette Art",
    "subcategoryName": "Graphic Art",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-17.jpg?update…",
    "price": "65$",
    "rating": "4.5",
    "customization": "yes",
    "processing_time": "3 days",
    "stockStatus": "In Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Striking silhouette art, minimalist and elegant.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Vintage Horse Print",
    "subcategoryName": "Vintage Prints",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-13.jpg?update…",
    "price": "85$",
    "rating": "4.8",
    "customization": "no",
    "processing_time": "4 days",
    "stockStatus": "Limited Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Classic vintage print, perfect for traditional settings.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Oil Painting: Horse",
    "subcategoryName": "Oil Paintings",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-2.jpg?updated…",
    "price": "300$",
    "rating": "5.0",
    "customization": "yes",
    "processing_time": "14 days",
    "stockStatus": "In Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Original oil painting, a masterpiece of equine artistry.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Farm Landscape",
    "subcategoryName": "Rural Scenes",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-10.jpg?update…",
    "price": "70$",
    "rating": "4.4",
    "customization": "no",
    "processing_time": "2 days",
    "stockStatus": "In Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Serene farm scene with horses grazing.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Clay Horse Figurine",
    "subcategoryName": "Figurines",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-13.jpg?update…",
    "price": "45$",
    "rating": "4.3",
    "customization": "no",
    "processing_time": "3 days",
    "stockStatus": "In Stock",
    "name": "Rojoni Klanto",
    "email": "jisan.cse.cu@gmail.com",
    "shortDescription": "Small, intricately detailed clay horse figurine.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Traditional Weave",
    "subcategoryName": "Woven Goods",
    "imageURL": "https://5.imimg.com/data5/YM/UQ/JW/SELLER-2094048/terracotta-jewellery…",
    "price": "190$",
    "rating": "4.6",
    "customization": "yes",
    "processing_time": "8 days",
    "stockStatus": "Limited Stock",
    "name": "Rojoni Klanto",
    "email": "jisan.cse.cu@gmail.com",
    "shortDescription": "Beautifully woven textile, a blend of tradition and art.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Modern Equine Art",
    "subcategoryName": "Contemporary Art",
    "imageURL": "https://i.imgur.com/l2a9Mkz.jpg",
    "price": "220$",
    "rating": "4.9",
    "customization": "yes",
    "processing_time": "6 days",
    "stockStatus": "In Stock",
    "name": "Md. Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "A bold and dynamic piece of contemporary horse art.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Minimalist Horse Sketch",
    "subcategoryName": "Sketches",
    "imageURL": "https://i.imgur.com/l2a9Mkz.jpg",
    "price": "35$",
    "rating": "4.2",
    "customization": "no",
    "processing_time": "1 day",
    "stockStatus": "In Stock",
    "name": "Md. Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Simple yet elegant horse sketch, perfect for any room.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Horse Race Photography",
    "subcategoryName": "Action Shots",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-17.jpg?update…",
    "price": "80$",
    "rating": "4.7",
    "customization": "no",
    "processing_time": "3 days",
    "stockStatus": "In Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Capturing the thrill of a horse race in motion.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Horse Stable Scene",
    "subcategoryName": "Rural Photography",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-13.jpg?update…",
    "price": "60$",
    "rating": "4.4",
    "customization": "no",
    "processing_time": "2 days",
    "stockStatus": "In Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Peaceful image of horses in a rustic stable.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Custom Horse Portrait",
    "subcategoryName": "Custom Art",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-2.jpg?updated…",
    "price": "350$",
    "rating": "5.0",
    "customization": "yes",
    "processing_time": "21 days",
    "stockStatus": "Available for Order",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "Personalized oil portrait of your beloved horse.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Forest Horse",
    "subcategoryName": "Wildlife Photography",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-10.jpg?update…",
    "price": "95$",
    "rating": "4.7",
    "customization": "no",
    "processing_time": "3 days",
    "stockStatus": "In Stock",
    "name": "Md Jisan Mia",
    "email": "mdjisanmia394@gmail.com",
    "shortDescription": "A captivating shot of a horse in a lush forest.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Terracotta Jewelry Set",
    "subcategoryName": "Jewelry",
    "imageURL": "https://ik.imagekit.io/ghlgoepam/New%20Folder/shop-2-img-13.jpg?update…",
    "price": "50$",
    "rating": "4.5",
    "customization": "no",
    "processing_time": "4 days",
    "stockStatus": "In Stock",
    "name": "Rojoni Klanto",
    "email": "jisan.cse.cu@gmail.com",
    "shortDescription": "Handmade terracotta jewelry, unique and earthy.",
    "currentUserEmail": "test@gmail.com"
  },
  {
    "itemName": "Silk Saree",
    "subcategoryName": "Ethnic Wear",
    "imageURL": "https://5.imimg.com/data5/YM/UQ/JW/SELLER-2094048/terracotta-jewellery…",
    "price": "400$",
    "rating": "4.8",
    "customization": "no",
    "processing_time": "7 days",
    "stockStatus": "In Stock",
    "name": "Rojoni Klanto",
    "email": "jisan.cse.cu@gmail.com",
    "shortDescription": "Luxurious silk saree with intricate designs.",
    "currentUserEmail": "test@gmail.com"
  }
]


    

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
    // const craftsCollection = database.collection("crafts"); depricated collection
    // new collection of craftsCollection
    const allItemsCollection = database.collection('allItems');
    const newLetterEmailCollection = database.collection("newsletters");
    const categoriesCollection = database.collection("categories");





    // categories data ping
    categoriesCollection.deleteMany({});
    categoriesCollection.insertMany(subcategories);
     // allItems data ping
    // allItemsCollection.deleteMany({});
    // allItemsCollection.insertMany(crafts);

    // to add item to collection
    app.post('/arts', async(req, res) => {
        const newCraft =  req.body;
        const result = await allItemsCollection.insertOne(newCraft);
        res.send(result);
    })
    // to store the newsletter email
    app.post('/newsletters', async(req, res) => {
      const newEmail = req.body;
      const result = await newLetterEmailCollection.insertOne(newEmail);
      res.send(result);
    })
    
    
    // to get the gallery(all items)
    app.get('/arts', async(req, res) => {
        const cursor = allItemsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    // get a single card using id
    app.get('/arts/:id', async(req, res) => {
      const id = req.params.id;
      const singleItem = await allItemsCollection.findOne({_id: new ObjectId(id)});
      res.send(singleItem);
    })
    // to get the categories 
    app.get('/categories', async(req, res) => {
      const cursor = categoriesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    // to get the my creations of a user using email
    app.get('/arts/myCreation/:email', async(req, res) => {
      const email = req.params.email;
      const query = {currentUserEmail: `${email}`};
      const result = await allItemsCollection.find(query).toArray();
      res.send(result);
    })

    // get random 6 data
    app.get('/random', async(req, res) => {
      const random = await allItemsCollection.aggregate([{$sample: {size: 20}}]).toArray();
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