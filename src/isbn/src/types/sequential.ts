import type { Constructor } from './constructor.js';

interface Sequential {
  get integral(): string;
  get length(): number;
  get original(): string;
}

type SequentialConstructor = Constructor<Sequential>;

export type {
  Sequential,
  SequentialConstructor,
};
