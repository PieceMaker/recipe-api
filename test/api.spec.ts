import axios from 'axios';
import { expect } from 'chai';
import { recipes } from '../db/data/recipes';

describe('API', function() {

    describe('Load', function() {

        it('should load mother\'s recipe given the mother\'s recipe id', async function() {
            const mothersId = '5fa8a136a26e5309eeda546b';
            const recipe = recipes.find(recipe => recipe._id === mothersId);
            const apiRecipe = await axios.get(`http://localhost:8000/load/${mothersId}`)
                .then(({ data }) => data);
            expect(apiRecipe).to.eql(recipe);
        });

        it('should load Popeye\'s recipe given the Popeye\'s recipe id', async function() {
            const popeyesId = '5fa8a511460dae6b34c2dee7';
            const recipe = recipes.find(recipe => recipe._id === popeyesId);
            const apiRecipe = await axios.get(`http://localhost:8000/load/${popeyesId}`)
                .then(({ data }) => data);
            expect(apiRecipe).to.eql(recipe);
        });

    });

});