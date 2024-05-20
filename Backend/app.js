const express = require('express');
const AuthRoutes = require('./routes/AuthRoutes');
const TaskRoutes = require('./routes/TaskRoutes'); 
const connectDB = require('./config/database');
const inventoryRoutes = require('./routes/inventoryRoutes')
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes')


const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use('/auth', AuthRoutes);
app.use('/tasks', TaskRoutes);
app.use('/api/inventory', inventoryRoutes)
app.use('/api/products', productRoutes)


app.use((err, req, res, next) => {
    console.log(err.stick);
    res.status(500).send('Server Error')
})

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});