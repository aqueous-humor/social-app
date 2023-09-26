import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import path from "path";
import compile  from "./devBundle.js";
import template from "../template.js";

const CURRENT_WORKING_DIR = process.cwd();

const uri = process.env.MONGODB_URI || "mongodb+srv://aqueous_humor:akpos123456789@cluster0.xtvjaod.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3000;

const app = express();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const runMongodb = async () => {
    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

// Compile client-side code in dev mode 
compile(app);

// Serve static files from /dist
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Routes
app.get("/", (req, res) => {
    res.status(200).send(template())
});

// Listen for requests
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.info("Server is running on port %s.", PORT);
        runMongodb().catch(console.dir);
    }
});