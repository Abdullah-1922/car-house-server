const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Assignment10
// VcKKSuBeHLwwqi1G


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Assignment10:VcKKSuBeHLwwqi1G@cluster0.kdy82ie.mongodb.net/?retryWrites=true&w=majority";

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
   
    await client.connect();
    const brandCollection=client.db("brandDB").collection("brands");
    const productCollection=client.db("brandDB").collection("products");

    app.post('/brands',async(req,res)=>{
      const brands =req.body
      const result = await brandCollection.insertOne(brands);
      res.send(result);
    })
    app.post('/products',async(req,res)=>{
      const products =req.body
      const result = await productCollection.insertOne(products);
      res.send(result);
      console.log(result);
    })
    app.get("/brands",async(req,res)=>{
      const result = await brandCollection.find().toArray();
      res.send(result);
    })
    app.get("/allProducts",async(req,res)=>{
      const result = await productCollection.find().toArray();
      res.send(result);
    })
    app.get("/allProducts/:id",async(req,res)=>{
      const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.findOne(query);
        res.send(result);
      console.log(result);
    })
    app.put("/allProducts/:id",async(req,res)=>{
      const id = req.params.id;
      const product =req.body
      const query = { _id: new ObjectId(id) };
      const options ={upsert:true}
      const result = await productCollection.updateOne(query,{ $set: product},options);
      res.send(result);
      console.log(result);
    })
    app.get("/products/:brandName",async(req,res)=>{
      const brandName = req.params.brandName;
      console.log(brandName);
      const query = {carBrand : brandName }
      const result = await productCollection.find(query).toArray();
      res.send(result);
      console.log(result);
    })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Crud is running...");
  });

  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });