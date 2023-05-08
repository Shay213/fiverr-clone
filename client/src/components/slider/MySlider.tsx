import "./slider.scss";
import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import arrLeft from "../../assets/img/arrow-left-sm-svgrepo-com.svg";
import arrRight from "../../assets/img/arrow-right-sm-svgrepo-com.svg";

interface MySliderProps {
  children: ReactNode;
  visibleElements: number;
  elWidth: number;
  elHeight: number;
  gap: number;
  style?: object;
  arrows?: boolean;
  autoSlide?: boolean;
}

export default function MySlider({
  children,
  visibleElements,
  elWidth,
  elHeight,
  gap,
  style,
  arrows,
  autoSlide = true,
}: MySliderProps) {
  const numOfElements = Children.count(children);
  const sliderWidth = visibleElements * elWidth + (visibleElements - 1) * gap;
  const containerWidth = numOfElements * elWidth + (numOfElements - 1) * gap;
  const leftThreshold = (-containerWidth - gap) * 2;
  const rightThreshold = (containerWidth + gap) * 2;
  const intervalId = useRef<number | null>(null);
  const isInAnimation = useRef(false);

  const updatedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        style: {
          ...child.props.style,
          width: `${elWidth}px`,
          height: `${elHeight}px`,
        },
      } as React.HTMLAttributes<HTMLElement>);
    }
    return null;
  });

  const [transformX, setTransformX] = useState({
    left: { value: -containerWidth - gap, transition: 0 },
    middle: { value: 0, transition: 0 },
    right: { value: containerWidth + gap, transition: 0 },
  });

  const elReachedThreshold = (val: number) => {
    return val <= leftThreshold
      ? { value: containerWidth + gap, transition: 0 }
      : val >= rightThreshold
      ? { value: -containerWidth - gap, transition: 0 }
      : { value: val, transition: 500 };
  };

  const intervalManager = (
    flag: boolean,
    animate?: () => void,
    time?: number
  ) => {
    if (flag && animate && time) {
      intervalId.current = setInterval(animate, time);
    } else {
      if (intervalId.current) clearInterval(intervalId.current);
    }
  };

  const slide = (slideBy: number = elWidth + gap) => {
    setTransformX((prev) => ({
      left: elReachedThreshold(prev.left.value - slideBy),
      middle: elReachedThreshold(prev.middle.value - slideBy),
      right: elReachedThreshold(prev.right.value - slideBy),
    }));
  };

  useEffect(() => {
    if (!autoSlide) return;
    intervalManager(true, slide, 3000);

    return () => {
      intervalManager(false);
    };
  }, []);

  const handleEnter = () => {
    if (!autoSlide) return;
    intervalManager(false);
  };
  const handleLeave = () => {
    if (!autoSlide) return;
    intervalManager(true, slide, 3000);
  };
  const handleLeft = () => {
    if (isInAnimation.current) return;
    slide(elWidth + gap);
    isInAnimation.current = true;
    setTimeout(() => (isInAnimation.current = false), 550);
  };

  const handleRight = () => {
    if (isInAnimation.current) return;
    slide(-(elWidth + gap));
    isInAnimation.current = true;
    setTimeout(() => (isInAnimation.current = false), 550);
  };

  return (
    <div
      className="slider"
      style={{
        width: `${sliderWidth}px`,
        height: `${elHeight}px`,
        ...style,
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="container"
        style={{
          gap: `${gap}px`,
          transition: `transform ${transformX.left.transition}ms`,
          transform: `translate(${transformX.left.value}px)`,
        }}
      >
        {updatedChildren}
      </div>
      <div
        className="container"
        style={{
          gap: `${gap}px`,
          transition: `transform ${transformX.middle.transition}ms`,
          transform: `translate(${transformX.middle.value}px)`,
        }}
      >
        {updatedChildren}
      </div>
      <div
        className="container"
        style={{
          gap: `${gap}px`,
          transition: `transform ${transformX.right.transition}ms`,
          transform: `translate(${transformX.right.value}px)`,
        }}
      >
        {updatedChildren}
      </div>
      {arrows && (
        <>
          <button className="left" onClick={handleLeft}>
            <img src={arrLeft} alt="" />
          </button>
          <button className="right" onClick={handleRight}>
            <img src={arrRight} alt="" />
          </button>
        </>
      )}
    </div>
  );
}
