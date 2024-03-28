import { XMLParser } from 'fast-xml-parser';

const mapper: Record<string, string> = {
  /** Remove some confusing tags. */
  Agency: 'agency',
  'EAN.UCC': 'eanUcc',
  'EAN.UCCPrefixes': 'eanUccPrefixes',
  Group: 'group',
  ISBNRangeMessage: 'isbnRangeMessage',
  Length: 'length',
  // MessageDate: 'messageDate',
  // MessageSerialNumber: 'messageSerialNumber',
  // MessageSource: 'messageSource',
  Prefix: 'prefix',
  Range: 'range',
  RegistrationGroups: 'registrationGroups',
  Rule: 'rule',
  Rules: 'rules',
};

function parse(xmlData: string): unknown {
  const parser = new XMLParser({
    ignoreDeclaration: true,
    parseTagValue: false,
    updateTag: tagName => mapper[tagName] ?? false,
  });
  return parser.parse(xmlData, true);
}

export {
  parse,
};
