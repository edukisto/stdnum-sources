import jsonData from './isbn_ranges.json' with { type: 'json' };
import type { EanUcc } from './types/ean_ucc.js';
import type { Group } from './types/group.js';
import type { IsbnRangeMessage } from './types/isbn_range_message.js';
import type { Rule } from './types/rule.js';

const isbnRanges: IsbnRangeMessage = jsonData;

export {
  isbnRanges,
  type EanUcc,
  type Group,
  type IsbnRangeMessage,
  type Rule,
};
