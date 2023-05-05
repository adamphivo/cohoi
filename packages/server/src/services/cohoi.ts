import { ItemMeta, TrackMeta, ICohoiResponse } from "@cohoi/common/types/index";
export class Cohoi {
  private collections: string[] = ["cratediggers", "archiveofcontemporarymusic", "acdc", "internetarchivemusic", "samplecds", "samples_only", "unlockedrecordings", "free_sample_zone"];
  private BASE_ITEM_PAGE: string = "https://archive.org/details/";
  private BASE_IMAGE_URL: string = "https://archive.org/services/img/";

  /**
   * Retrieves the Metadata of the Collection Item and the Metadata of a random audio file from this Collection Item
   * @returns
   */
  public async getRandomTrack(): Promise<ICohoiResponse> {
    const item = await this.getRandomItem();
    const identifier = item.identifier;
    const trackMetadata = await this.getRandomTrackFromIdentifier(identifier);
    const URL = this.getURLFromMetada(identifier, trackMetadata);

    return {
      itemImageURL: this.BASE_IMAGE_URL + identifier,
      itemMetadata: item,
      itemBasePageURL: this.BASE_ITEM_PAGE + identifier,
      trackMetadata: trackMetadata,
      trackDownloadURL: URL,
    };
  }

  private async getRandomItem(): Promise<ItemMeta> {
    const collection = this.getRandomCollection();
    const response = await fetch(`https://archive.org/advancedsearch.php?q=collection:${collection}%20AND%20mediatype:audio%20AND%20format:(wav%20OR%20flac)&sort[]=random&rows=1000&output=json`);
    const data = await response.json();
    const randomItem = data.response.docs[Math.floor(Math.random() * data.response.docs.length)];
    return randomItem;
  }

  private async getRandomTrackFromIdentifier(identifier: string): Promise<TrackMeta> {
    const response = await fetch(`https://archive.org/metadata/${identifier}`);
    const metadata = await response.json();
    const files = metadata.files.filter((file: any) => file.name.includes(".mp3"));
    const trackMetadata = files[Math.floor(Math.random() * files.length)];
    return trackMetadata;
  }

  private getURLFromMetada(identifier: string, metadata: any): string {
    return this.cleanURL(`https://archive.org/download/${identifier}/${metadata.name}`);
  }

  private getRandomCollection(): string {
    return this.collections[Math.floor(Math.random() * this.collections.length)];
  }

  private cleanURL(url: string): string {
    return url.replace(/\s+/g, "%20");
  }
}
