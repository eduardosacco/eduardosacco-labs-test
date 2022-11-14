export default function Emoji(props) {
  return (
    <span
      role="img"
      // Make screen readers ignore emojis if there is no label
      aria-label={props.label ? props.label : ''}
      aria-hidden={props.label ? 'false' : 'true'}
    >
      {props.symbol}
    </span>
  );
}
