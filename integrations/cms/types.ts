export type WixDataItem = {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  // Additional fields are allowed
  [key: string]: unknown;
};

export type WixDataQueryResult<T extends WixDataItem = WixDataItem> = {
  items: T[];
  totalCount?: number;
  hasNext(): boolean;
};
