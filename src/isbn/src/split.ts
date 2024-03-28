import { isbnRanges, type EanUcc, type Group, type Rule } from '@stdnum/isbn-ranges';

function check(rule: Rule, needle: number) {
  const [mix, max] = rule.range.split('-');
  return (Number(mix) <= needle) && (needle <= Number(max));
}

function getLength(rules: Rule | Rule[], needle: number): number {
  const rule = Array.isArray(rules)
    ? rules.find(value => check(value, needle))
    : check(rules, needle) ? rules : null;
  if (!rule) {
    throw new Error('No matching range found');
  }
  return Number(rule.length);
}

type T = EanUcc | EanUcc[] | Group | Group[];

function findRuleByPrefix(data: T, prefix: string): Rule | Rule[] {
  const record = Array.isArray(data)
    ? data.find(value => value.prefix === prefix)
    : data.prefix === prefix ? data : undefined;
  if (!record) {
    throw new Error('No matching rule found');
  }
  return record.rules.rule;
}

function split(isbn: string): string[] {
  const checkDigitLength = 1;
  const length = 13;
  const minPublicationLength = 1;
  const minRegistrantLength = 1;
  const prefixLength = 3;
  let index = 0;

  const prefix = isbn.substring(index, index += prefixLength);

  const eanUcc = isbnRanges.isbnRangeMessage.eanUccPrefixes.eanUcc;
  const groups = findRuleByPrefix(eanUcc, prefix);
  const maxRegistrationGroupLength = length - prefixLength - minRegistrantLength
    - minPublicationLength - checkDigitLength;
  const groupNeedle = isbn.substring(index, index + maxRegistrationGroupLength);
  const registrationGroupLength = getLength(groups, Number(groupNeedle));
  if (registrationGroupLength === 0) {
    throw new Error('The registration group element is not defined for use');
  }
  const registrationGroup = isbn.substring(index, index += registrationGroupLength);

  const group = isbnRanges.isbnRangeMessage.registrationGroups.group;
  const registrants = findRuleByPrefix(group, `${prefix}-${registrationGroup}`);
  const maxRegistrantLength = length - prefixLength - registrationGroupLength
    - minPublicationLength - checkDigitLength;
  const registrantNeedle = isbn.substring(index, index + maxRegistrantLength);
  const registrantLength = getLength(registrants, Number(registrantNeedle));
  if (registrantLength === 0) {
    throw new Error('The registrant element is not defined for use');
  }
  const registrant = isbn.substring(index, index += registrantLength);

  const publication = isbn.substring(index, index = length - checkDigitLength);

  const checkDigit = isbn.substring(index);

  return [
    prefix,
    registrationGroup,
    registrant,
    publication,
    checkDigit,
  ];
}

export {
  split,
};
