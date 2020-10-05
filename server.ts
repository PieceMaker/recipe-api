import express from 'express';

const app = express();
const port = 8000;

////////
// GET
////////

app.get('/', (req, res) => {
    res.send('It\'s an express server.');
});

app.get('/load/:id', (req, res) => {
    res.status(400).send('/load/:id not yet implemented.');
});

app.get('/search/:pattern/:page', (req, res) => {
    res.status(400).send('/search/:pattern/:page not yet implemented.');
});

app.get('/search/:pattern', (req, res) => {
    res.status(400).send('/search/:pattern not yet implemented.');
});

////////
// POST
////////

app.post('/login', (req, res) => {
    res.status(400).send('/login not yet implemented.');
});

app.post('/logout', (req, res) => {
    res.status(400).send('/logout not yet implemented.');
});

app.post('/insert', (req, res) => {
    res.status(400).send('/insert not yet implemented.');
})

////////
// PUT
////////

app.put('/update/:id', (req, res) => {
    res.status(400).send('/update/:id not yet implemented.');
});

////////
// DELETE
////////

app.delete('/delete/:id', (req, res) => {
    res.status(400).send('/delete/:id not yet implemented.');
});

////////
// Listen
////////

app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}...`);
});