import { describe, test, expect, jest } from '@jest/globals';
import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('js-foundation/06_promises', () => {

    test('getPokemonById debe devolver un pokemon', async() => {

        const pokemonId = 1;

        const pokemonName = await getPokemonById(pokemonId);

        expect(pokemonName).toBe('bulbasaur');

    });

});