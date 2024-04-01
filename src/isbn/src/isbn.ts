import { makeCalculator } from './calculator.js';
import { makeChecker } from './checker.js';
import { makeConverter } from './converter.js';
import { Sequence } from './sequence.js';
import { makeSplitter } from './splitter.js';
import { makeValidator } from './validator.js';

const ISBN = makeValidator(
  makeConverter(
    makeSplitter(
      makeChecker(
        makeCalculator(
          Sequence,
        ),
      ),
    ),
  ),
);

export {
  ISBN,
};
