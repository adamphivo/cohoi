import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import type { ICohoiResponse } from "@cohoi/common/types";

interface Props {
  item: ICohoiResponse;
}

export default function Item(props: Props) {
  return (
    <>
      <img src={props.item.thumbnail} />
      <div>Name:{props.item.name}</div>
      <div>{props.item.size}</div>
      <div>Artist: {props.item.artist}</div>
      <div>Genre: {props.item.genre}</div>
      <div>External page: {props.item.itemPageURL}</div>
      <AudioPlayer src={props.item.URL} />
      <a href={props.item.URL} download>
        Download
      </a>
    </>
  );
}
