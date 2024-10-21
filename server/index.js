const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConnection = require('./config/database');
const PORT = process.env.PORT || 5000
app.use(cors());
const route = require('./routes/route')

app.use('/api/v1',route)


app.listen(PORT,()=>{
   console.log(`Server Started at ${PORT}`);
})