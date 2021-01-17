// Modules
import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import auth from './src/routes/auth';
import recipe from './src/routes/recipe';
app.use('/auth', auth);
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