import type { Checkable } from './checkable.js';
import type { Constructor } from './constructor.js';
import type { Separator10 } from './separator_10.js';
import type { Separator13 } from './separator_13.js';
import type { Splittable } from './splittable.js';

interface Convertible extends Checkable, Splittable {
  convertTo10(separator: Separator10): string;
  convertTo13(separator: Separator13): string;
  isConvertibleTo10(): boolean;
}

type ConvertibleConstructor = Constructor<Convertible>;

export type {
  Convertible,
  ConvertibleConstructor,
};
