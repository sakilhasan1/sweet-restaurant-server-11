const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DBB_USER}:${process.env.DBB_PASSWORD}@cluster0.stybsc2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const foodCollection = client.db('FoodDb').collection('Foods')

app.post('/foods', async (req, res) => {
    try {
        const food = req.body
        const result = await foodCollection.insertOne(food)
        // res.send(result)
        if (result.insertedId) {
            res.send({
                success: true,
                message: 'Food created success fully'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})

app.get('/foods', async (req, res) => {
    try {
        const cursor = foodCollection.find({})
        const foods = await cursor.toArray()
        // res.send(result)
        res.send({
            success: true,
            message: 'successfully got the data',
            data: foods
        })

    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})

app.get('/homeFoods', async (req, res) => {
    try {
        const cursor = foodCollection.find({})
        const foods = await cursor.limit(3).toArray()
        // res.send(result)
        res.send({
            success: true,
            message: 'successfully got the data',
            data: foods
        })

    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})

app.get('/service/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const food = await foodCollection.findOne({ _id: ObjectId(id) })
        res.send(food)


    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})

app.get('/', (req, res) => {
    res.send('sweet restaurants is running')
})

app.listen(port, () => {
    console.log('sweet restaurants is running on', port);
})

