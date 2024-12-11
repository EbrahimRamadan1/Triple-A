export default function ImgLoader(props) {
  return (
    <div>
      <img
        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        alt="Loading..."
        className={props.style}
      />
    </div>
  );
}
