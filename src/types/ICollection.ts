export enum DATA_TYPE {
  TEXT = 'TEXT',
  INTEGER = 'INTEGER',
  FLOAT = 'FLOAT',
  DATE_TIME = 'DATE_TIME',
  FILE = 'FILE',
}

export type IAttribute = {
  type: DATA_TYPE;
  displayName?: string;
}

export type ICollection = {
  collectionName?: string;
  attributes?: {
    [key: string]: IAttribute;
  };
};
