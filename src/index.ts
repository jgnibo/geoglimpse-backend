
import cors from 'cors';
import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable morgan for logging
app.use(morgan('dev'));
app.use(cookieParser());

// enable/disable cross origin resource sharing if necessary
// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(cors({
  origin(origin, callback) {
    const allowedOrigins = ["http://localhost:5173"];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true, // reflecting the request's credentials mode
}));

//app.use('/auth', authRouter);
//app.use('/s3', s3Router);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('GeoGlimpse API');
});

async function start() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/geoglimpse-dev';
    await mongoose.connect(mongoURI);
    console.log(`Mongoose connected to: ${mongoURI}`);
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();