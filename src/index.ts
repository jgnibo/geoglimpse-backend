import cors from 'cors';
import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'ws';
import { tileServices } from './services';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// FOR USE IN WEBSOCKETS
const server = createServer(app);
const wss = new WebSocketServer({ server });

interface LocationMessage {
  latitude: number;
  longitude: number;
  userId: string;
}

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  const lastDate = new Date();
  const newDate = new Date();

  ws.on('message', async (message) => {
    console.log(`Received message: ${message}`);
    const locationData: LocationMessage = JSON.parse(message.toString());
    newDate.setTime(Date.now());

    // Check time spent since last message, credit last tile with ticks
    const secondsElapsed = (newDate.getTime() - lastDate.getTime()) / 1000;
    const ticks = secondsElapsed / 5;
    lastDate.setTime(newDate.getTime());

    // Right now this is crediting new tile with ticks. Need to credit old tile and then credit new tile with 1.
    try {
      const foundTile = await tileServices.findIntersectingTile({ type: 'Point', coordinates: [locationData.longitude, locationData.latitude] })
      if (foundTile) {
        console.log('Adding ticks to tile', ticks, foundTile.indexedId);
        //const confirmation = await userServices.updateUserTileFrequencyMap(locationData.userId, foundTile.indexedId, ticks);
      }
    } catch (error) {
      console.error(error);
    }
  });
});

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
    const allowedOrigins = ["http://localhost:5173", "https://geoglimpse-frontend.onrender.com"];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true, // reflecting the request's credentials mode
}));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('GeoGlimpse API');
});


async function start() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/geoglimpse-dev';
    await mongoose.connect(mongoURI);
    console.log(`Mongoose connected to: ${mongoURI}`);

    // Running server here instead of app to accomodate websockets
    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();