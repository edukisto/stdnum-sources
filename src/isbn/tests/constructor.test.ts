import { describe, expect, test } from '@jest/globals';
import { ISBN } from '../src/isbn.js';

describe('throws on wrong ISBN format', () => {
  test.each([
    '',
    '',
  ])('%s', (value) => {
    expect(() => {
      new ISBN(value);
    }).toThrow();
  });
});

describe('throws on wrong ISBN length', () => {
  test.each([
    '0',
    '01234567891234',
  ])('%s', (value) => {
    expect(() => {
      new ISBN(value);
    }).toThrow();
  });
});
