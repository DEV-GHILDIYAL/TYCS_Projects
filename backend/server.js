const path = require("path")
const connectMongo = require('./config/db');
const express =require("express") 
const cors =require("cors") 
const morgan =require("morgan") 
const dotenv =require("dotenv") 
const authenticate = require("./middleware/authenticate")
dotenv.config({ path: "./config/.env" });

connectMongo()
const app = express()

app.use(cors({
  origin: process.env.FRONT_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(morgan("dev"));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

//admin routes
app.use('/auth',require('./routes/auth'))
app.use('/admin',authenticate,require('./routes/admin'))

//normal user routes
app.use('/',authenticate,require('./routes/user'))

//auth routes


const PORT = process.env.PORT || 6000;
app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`));
