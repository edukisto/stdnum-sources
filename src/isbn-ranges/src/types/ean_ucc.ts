import type { Rule } from './rule.js';

interface EanUcc {
  agency: string;
  prefix: string;
  rules: {
    rule: Rule | Rule[];
  };
}

export type {
  EanUcc,
};
