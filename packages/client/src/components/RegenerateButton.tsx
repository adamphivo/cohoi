interface Props {
  handler: () => void;
}

export default function RegenerateButton(props: Props) {
  return (
    <>
      <button onClick={props.handler}>Regenerate 🎲</button>
    </>
  );
}
