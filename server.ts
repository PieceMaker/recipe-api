import express from 'express';

import recipe from './src/routes/recipe';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/recipe', recipe);

////////
// GET
////////

app.get('/', (req, res) => {
    res.send('It\'s an express server.');
});

app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}...`);
});