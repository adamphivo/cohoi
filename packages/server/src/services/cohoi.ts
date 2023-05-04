export class Cohoi {
  private collections: string[] = ["cratediggers"];
  private BASE_ITEM_PAGE: string = "https://archive.org/details/";

  public async getRandomSound() {
    const identifier = await this.getRandomIdentifier();
    const { metadata, thumbnail } = await this.getRandomMetadataFromIdentifier(identifier);
    const URL = this.getURLFromMetada(identifier, metadata);
    return { ...metadata, URL, thumbnail, itemPageURL: this.BASE_ITEM_PAGE + identifier, thumbnailv2: `https://archive.org/download/${identifier}/${identifier}.jpg` };
  }

  private async getRandomIdentifier() {
    const randomCollection = this.collections[Math.floor(Math.random() * this.collections.length)];
    const response = await fetch(
      "https://archive.org/advancedsearch.php" + `?q=collection:${randomCollection}%20AND%20mediatype:audio%20AND%20format:(wav%20OR%20flac)` + "&fq=-duration:[180:]" + "&sort[]=random" + "&rows=1000" + "&output=json"
    );
    const data = await response.json();
    const randomItem = data.response.docs[Math.floor(Math.random() * data.response.docs.length)];
    return randomItem.identifier;
  }

  private async getRandomMetadataFromIdentifier(identifier: string) {
    const response = await fetch(`https://archive.org/metadata/${identifier}`);
    const metadata = await response.json();
    const files = metadata.files.filter((file: any) => file.name.includes(".mp3"));
    const thumbnailData = metadata.files.filter((file: any) => file.name.includes("thumb"))[0];
    const thumbnail = `https://archive.org/download/${identifier}/${thumbnailData.name.replace(" ", "%20")}`;
    return { metadata: files[Math.floor(Math.random() * files.length)], thumbnail };
  }

  private getURLFromMetada(identifier: string, metadata: any) {
    return `https://archive.org/download/${identifier}/${metadata.name.replace(" ", "%20")}`;
  }
}
