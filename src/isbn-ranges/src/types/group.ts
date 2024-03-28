import type { Rule } from './rule.js';

interface Group {
  agency: string;
  prefix: string;
  rules: {
    rule: Rule | Rule[];
  };
}

export type {
  Group,
};
