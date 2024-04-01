import type { EanUcc, Group, Rule } from '@stdnum/isbn-ranges';
import { isbnRanges } from '@stdnum/isbn-ranges';
import type { SequentialConstructor } from './types/sequential.js';
import type { Splittable } from './types/splittable.js';
import type { Splitted } from './types/splitted.js';

type T = EanUcc | EanUcc[] | Group | Group[];

function check(rule: Rule, needle: number): boolean {
  const [mix, max] = rule.range.split('-');
  return (Number(mix) <= needle) && (needle <= Number(max));
}

function findRuleByPrefix(data: T, prefix: string): Rule | Rule[] {
  const record = Array.isArray(data)
    ? data.find(value => value.prefix === prefix)
    : data.prefix === prefix ? data : undefined;
  if (!record) {
    throw new Error('No matching rule found');
  }
  return record.rules.rule;
}

function getLength(rules: Rule | Rule[], needle: number): number {
  const rule = Array.isArray(rules)
    ? rules.find(value => check(value, needle))
    : check(rules, needle) ? rules : null;
  if (!rule) {
    // Never happens. Must be mocked.
    throw new Error('No matching range found');
  }
  return Number(rule.length);
}

function makeSplitter<TBase extends SequentialConstructor>(Base: TBase) {
  return class Splitter extends Base implements Splittable {
    _splitted = {} as Splitted;

    split(): Splitted {
      if (Object.keys(this._splitted).length !== 0) {
        return this._splitted;
      }

      const checkDigitLength = 1;
      const isbn = this.integral;
      const length = 13;
      const minPublicationLength = 1;
      const minRegistrantLength = 1;
      const prefixLength = 3;
      let index = 0;

      const prefix = isbn.substring(index, index += prefixLength);

      const eanUccTags = isbnRanges.isbnRangeMessage.eanUccPrefixes.eanUcc;
      const groups = findRuleByPrefix(eanUccTags, prefix);
      const maxGroupLength = length - prefixLength - minRegistrantLength
        - minPublicationLength - checkDigitLength;
      const suffix1 = isbn.substring(index, index + maxGroupLength);
      const groupLength = getLength(groups, Number(suffix1));
      if (groupLength === 0) {
        throw new Error('The registration group is not defined for use');
      }
      const group = isbn.substring(index, index += groupLength);

      const groupTags = isbnRanges.isbnRangeMessage.registrationGroups.group;
      const registrants = findRuleByPrefix(groupTags, `${prefix}-${group}`);
      const maxRegistrantLength = length - prefixLength - groupLength
        - minPublicationLength - checkDigitLength;
      const suffix2 = isbn.substring(index, index + maxRegistrantLength);
      const registrantLength = getLength(registrants, Number(suffix2));
      if (registrantLength === 0) {
        throw new Error('The registrant is not defined for use');
      }
      const registrant = isbn.substring(index, index += registrantLength);

      const publication = isbn.substring(
        index,
        index = length - checkDigitLength,
      );

      const checkDigit = isbn.substring(index);

      this._splitted = {
        checkDigit,
        group,
        prefix,
        publication,
        registrant,
      };

      return this._splitted;
    }
  };
}

export {
  makeSplitter,
};
