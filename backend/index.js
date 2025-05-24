
const express = require("express");
const { connectDB } = require("./db");

const app = express();
const PORT = 4000;
const userRouter = require('./routes/user.route');
app.use(express.json());

app.use('/api/user', userRouter);

app.listen(PORT, async () => {


    await connectDB();


    console.log(`Server running on http://localhost:${PORT}`);

});

app.get("/", (req, res) => {
    res.send(" Express App Running!");
});
