import type { Sequential } from './types/sequential.js';

class Sequence implements Sequential {
  _integral = '';
  _length = 0;
  _original = '';

  get integral(): string {
    return this._integral;
  }

  get length(): number {
    return this._length;
  }

  get original(): string {
    return this._original;
  }

  constructor(original: string) {
    if (!/^\d+(?:([-\x20])\d+)*(?:\1?[\dX])$/u.test(original)) {
      throw new RangeError('Wrong ISBN format');
    }
    this._original = original;
    const digits = this._original.replace(/[^\dX]/gu, '');
    this._length = digits.length;
    if (![10, 13].includes(this._length)) {
      throw new RangeError('Wrong ISBN length');
    }
    this._integral = (this._length === 10 ? '978' : '') + digits;
  }
}

export {
  Sequence,
};
