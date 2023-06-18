import express from 'express';
import dotenv  from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import postRoute from './routes/posts.js'
import CategoryRoute from './routes/categories.js';
import multer from 'multer'
import cors from 'cors'
import path from 'path';

dotenv.config()
const app = express()
app.use(express.json())
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser :true,
    useUnifiedTopology : true,
}).then(console.log('Database connected to mongo')).catch((err) => console.error(err))

app.use(cors({
  credentials : true,
  origin : "http://localhost:5173",
}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
const upload = multer({ storage: storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", CategoryRoute);

app.listen(5000, () => console.log('Listening for connections on port 5000'))