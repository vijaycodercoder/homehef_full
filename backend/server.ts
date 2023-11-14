import express, { Request, Response } from 'express';
import cros from 'cors'
import router from './routers/router';

const app = express();

app.use(cros())
app.use(express.json())

app.use('/api', router);


app.listen(3000, () => {
    console.log('Server is running');
});
