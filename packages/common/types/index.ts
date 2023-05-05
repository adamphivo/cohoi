export interface ICohoiResponse {
  itemImageURL: string;
  itemMetadata: ItemMeta;
  itemBasePageURL: string;
  trackMetadata: TrackMeta;
  trackDownloadURL: string;
}

export interface ItemMeta {
  backup_location: string;
  collection: string[];
  creator: string;
  date: string;
  description: string;
  downloads: number;
  format: string[];
  identifier: string;
  indexflag: string[];
  item_size: number;
  licenseurl: string;
  mediatype: string;
  month: number;
  oai_updatedate: string[];
  publicdate: string;
  subject: string[];
  title: string;
  week: number;
  year: number;
}

export interface TrackMeta {
  name: string;
  source: string;
  title: string;
  bitrate: string;
  length: string;
  format: string;
  original: string;
  mtime: string;
  size: string;
  md5: string;
  crc32: string;
  sha1: string;
}
