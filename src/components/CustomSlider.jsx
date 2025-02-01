import React, { useRef, useCallback } from "react";

const CustomSlider = ({ value, onChange, rollType }) => {
  const sliderRef = useRef(null);

  const minValue = rollType === "over" ? 7 : 1;
  const maxValue = rollType === "over" ? 99 : 93;

  const handleSliderInteraction = useCallback(
    (clientX) => {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = (clientX - rect.left) / rect.width;
      const newValue = Math.max(
        minValue,
        Math.min(maxValue, Math.round(percentage * 100))
      );
      onChange(newValue);
    },
    [minValue, maxValue, onChange]
  );

  const handleInteractionStart = useCallback(
    (event) => {
      event.preventDefault();
      const clientX =
        event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
      handleSliderInteraction(clientX);

      const handleMove = (e) => {
        e.preventDefault();
        handleSliderInteraction(
          e.type === "touchmove" ? e.touches[0].clientX : e.clientX
        );
      };

      const handleEnd = () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchend", handleEnd);
      };

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchend", handleEnd);
    },
    [handleSliderInteraction]
  );

  const overColor = "rgb(204, 74, 56)";
  const underColor = "rgb(35, 201, 121)";
  const primaryColor = rollType === "over" ? overColor : underColor;
  const secondaryColor = rollType === "over" ? underColor : overColor;

  const sliderBackground = `linear-gradient(to right, 
    ${primaryColor} 0% ${value}%, 
    ${secondaryColor} ${value}% 100%)`;

  return (
    <div className="w-full">
      <div
        ref={sliderRef}
        className="w-full h-4 rounded-md cursor-pointer relative"
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        style={{ background: sliderBackground }}
      >
        <div
          className="absolute top-0 h-full w-1 bg-white"
          style={{ left: `calc(${value}% - 2px)` }}
        />
      </div>

      <div className="w-full mt-1 flex justify-between text-white relative">
        {[0, 25, 50, 75, 100].map((tick) => (
          <div key={tick} className="absolute" style={{ left: `${tick}%` }}>
            <div className="h-3 w-0.5 bg-gray-400 mb-1 mx-auto" />
            <span className="text-xs absolute left-1/2 transform -translate-x-1/2 mt-1">
              {tick}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CustomSlider);