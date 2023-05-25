import express from 'express';
const app = express()
app.get('/', (req, resp) => {
    resp.send("hello");
})
app.listen(8080);