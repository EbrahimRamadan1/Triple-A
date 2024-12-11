/* eslint-disable react/prop-types */
export default function CardImg(props) {
  return (
    <div className="imageCard w-full animate__animated animate__fadeIn">
      <img
        src={props.src}
        className="w-full h-[204px] md:h-[307px] lg:h-[382px] "
        alt={props.alt}
        loading="lazy"
      />
    </div>
  );
}
