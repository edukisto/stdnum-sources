import type { Calculable10, Calculable13 } from './calculable.js';

interface Checkable extends Calculable10, Calculable13 {
  check(): boolean;
}

export type {
  Checkable,
};
