import axios from 'axios';
import { expect } from 'chai';
import { recipes } from '../db/data/recipes';

const mothersId = '5fa8a136a26e5309eeda546b';
const popeyesId = '5fa8a511460dae6b34c2dee7';
const mothersRecipe = recipes.find(recipe => recipe._id === mothersId);
const popeyesRecipe = recipes.find(recipe => recipe._id === popeyesId);

describe('API', function() {

    describe('Load', function() {

        it('should load mother\'s recipe given the mother\'s recipe id', async function() {
            const apiRecipe = await axios.get(`http://localhost:8000/load/${mothersId}`)
                .then(({ data }) => data);
            expect(apiRecipe).to.eql(mothersRecipe);
        });

        it('should load Popeye\'s recipe given the Popeye\'s recipe id', async function() {
            const apiRecipe = await axios.get(`http://localhost:8000/load/${popeyesId}`)
                .then(({ data }) => data);
            expect(apiRecipe).to.eql(popeyesRecipe);
        });

    });

});