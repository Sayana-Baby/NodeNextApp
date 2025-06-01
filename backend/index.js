
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const app = express();
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true 
}));
const PORT = 4000;
const userRouter = require('./routes/user.route');
const taskRoutes = require('./routes/task.route');
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/task',taskRoutes)

app.listen(PORT, async () => {


    await connectDB();


    console.log(`Server running on http://localhost:${PORT}`);

});

app.get("/", (req, res) => {
    res.send(" Express App Running!");
});
