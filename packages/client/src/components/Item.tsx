import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import type { ICohoiResponse } from "@cohoi/common/types";

interface Props {
  item: ICohoiResponse;
}

export default function Item(props: Props) {
  return (
    <>
      <img src={props.item.itemImageURL} />
      <div>Name:{props.item.itemMetadata.creator}</div>
      <div>Description: {props.item.itemMetadata.description}</div>
      <div>External page: {props.item.itemBasePageURL}</div>
      <AudioPlayer src={props.item.trackDownloadURL} />
      <a href={props.item.trackDownloadURL} download>
        Download
      </a>
    </>
  );
}
