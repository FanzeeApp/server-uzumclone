const express = require('express');  
const bodyParser = require('body-parser');  

const app = express();  
const PORT = process.env.PORT || 3000;  

app.use(bodyParser.json());  

let products = [];  

app.post('/api/products', (req, res) => {  
    const newProduct = {  
        id: products.length + 1,  
        ...req.body,  
    };  
    products.push(newProduct);  
    res.status(201).json(newProduct);  
});  

app.get('/api/products', (req, res) => {  
    res.json(products);  
});  

app.listen(PORT, () => {  
    console.log(`Server ${PORT} portida ishga tushdi`);  
});
