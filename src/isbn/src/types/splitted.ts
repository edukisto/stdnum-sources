type Mapped<T> = {
  [property in keyof T]: string;
};

type Splitted = Mapped<{
  checkDigit: string;
  group: string;
  prefix: string;
  publication: string;
  registrant: string;
}>;

export type {
  Splitted,
};
