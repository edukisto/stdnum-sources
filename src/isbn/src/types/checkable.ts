import type { Calculable } from './calculable.js';
import type { Constructor } from './constructor.js';

interface Checkable extends Calculable {
  check(): boolean;
}

type CheckableConstructor = Constructor<Checkable>;

export type {
  Checkable,
  CheckableConstructor,
};
