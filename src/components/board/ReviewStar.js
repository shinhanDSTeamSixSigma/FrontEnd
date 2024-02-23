import React, { useState } from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const StyledStar = styled(FaStar)`
  color: ${({ active }) => (active ? "#90C8AC" : "#ccc")};
  cursor: pointer;
  font-size: ${({ size }) => size || "30px"}; /* 별 크기 설정 */
`;

const StyledHalfStar = styled(FaStarHalfAlt)`
  color: ${({ active }) => (active ? "#90C8AC" : "#ccc")};
  cursor: pointer;
  font-size: ${({ size }) => size || "30px"}; /* 별 크기 설정 */
`;

const ReviewStar = ({ rating, setRating, size }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarHover = (value) => {
    setHoveredRating(value);
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <StarContainer>
      {[1, 2, 3, 4, 5].map((value) => {
        const isActive = value <= (hoveredRating || rating);
        const isHalf = (hoveredRating || rating) - value === -0.5;

        return (
          <span
            key={value}
            onMouseEnter={() => handleStarHover(value)}
            onMouseLeave={handleStarLeave}
            onClick={() => handleStarClick(value)}
          >
            {isHalf ? (
              <>
                <StyledHalfStar active={isActive} size={size} />
                <StyledStar size={size} style={{ position: "absolute", left: "0" }} />
              </>
            ) : (
              <StyledStar active={isActive} size={size} />
            )}
          </span>
        );
      })}
    </StarContainer>
  );
};

export default ReviewStar;
