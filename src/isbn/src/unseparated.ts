import type { Inseparable } from './types/inseparable.js';

class Unseparated implements Inseparable {
  protected unseparated: string;

  constructor(private readonly original: string) {
    if (/^\d+(?:[\x20-]\d+)*[\dX]$/.test(this.original)) {
      throw new RangeError('Wrong ISBN format');
    }
    this.unseparated = original.replace(/[^\dX]/, '');
    if (!(this.unseparated.length in [10, 13])) {
      throw new RangeError('Wrong ISBN length');
    }
  }
}

export {
  Unseparated,
};
