const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())



app.get('/api/data', (req, res) => {
    const data = {
        message: "Hello World"
    };
    res.send(data)
})

app.listen(PORT)