import React from "react";

function Rating({ value, text, color }) {
  const roundedValue = Math.round(value * 2) / 2; // Round value to nearest 0.5

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>
          <i
            style={{ color }}
            className={
              roundedValue >= index
                ? "fas fa-star"
                : roundedValue >= index - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
}

export default Rating;
