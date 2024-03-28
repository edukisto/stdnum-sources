import type { EanUcc } from './ean_ucc.js';
import type { Group } from './group.js';

interface IsbnRangeMessage {
  isbnRangeMessage: {
    eanUccPrefixes: {
      eanUcc: EanUcc | EanUcc[];
    };
    messageDate?: string;
    messageSerialNumber?: string;
    messageSource?: string;
    registrationGroups: {
      group: Group | Group[];
    };
  };
}

export type {
  IsbnRangeMessage,
};
