interface Props {
  count: number;
  className: string;
}

export const Rating: React.FC<Props> = ({ count: rating, className }) => {
  const starFull = "⭐";
  const starEmpty = "✰";
  const starArr = new Array(Math.ceil(rating)).fill(starFull);
  if (rating < Math.ceil(rating)) starArr[Math.floor(rating)] = starEmpty;
  return <div className={className}>{starArr.join(" ")}</div>;
}
