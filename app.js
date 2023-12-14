const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');

require('dotenv').config({
    path: './config/.env'
});

const connectDb = require('./config/db');
const authRouter=require('./routes/authRoutes');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());


app.use('/api/auth', authRouter);


app.listen(PORT, async (err) => {
    await connectDb();
    console.log('Server listening on port: ' + PORT);
})