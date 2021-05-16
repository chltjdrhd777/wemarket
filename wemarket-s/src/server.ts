//# configs
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import mongoose from 'mongoose';

//# paths
import userRoutes from 'routes/userRoutes';
import categoryRoutes from 'routes/categoryRoutes';
import uploadRoutes from 'routes/uploadRoutes';

//initializing app
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
dotenv.config();

//initializing mongoose
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_ADMIN}:${process.env.MONGO_PASSWORD}@cluster0.ovt4k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )
    .then(() => {
        console.log('monogoDB is connected');
    })
    .catch((err) => console.log(err));

//routes
app.use('/user', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', uploadRoutes);

//PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`listening port : ${PORT}`);
});
