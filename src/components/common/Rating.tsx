export function Rating({ count: rating }: { count: number }) {
  const starFull = "⭐";
  const starEmpty = "✰";
  const starArr = new Array(Math.ceil(rating)).fill(starFull);
  if (rating < Math.ceil(rating)) starArr[Math.floor(rating)] = starEmpty;
  return <div className="product-rating">{starArr.join(" ")}</div>;
}
