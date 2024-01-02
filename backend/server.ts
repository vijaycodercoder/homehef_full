import express, { Request, Response } from 'express';
import router from './routers/router';

const app = express();
app.use((req, res, next) => {
    // Allow any origin to access your API
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Set the allowed HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Set the allowed headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // Allow credentials (if needed)
    // res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Continue to the next middleware or route handler
    next();
});


app.use(express.json())

app.use('/api', router);


app.listen(3000, () => {
    console.log('Server is running');
});
