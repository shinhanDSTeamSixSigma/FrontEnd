import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StarSize = styled.div`
  font-size: ${({ size }) => size};
`
// 별 아이콘의 스타일을 지정
const StyledStar = styled(FaStar)`
  color: #90C8AC; 
`;

const StyledHalfStar = styled(FaStarHalfAlt)`
  color: #90C8AC; 
`;

const StyledEmptyStar = styled(FaRegStar)`
  color: #90C8AC; 
`;

const StarRating = ({ rating, size }) => {
  const fullStars = Math.floor(rating); // 전체 별 개수 (0.5 단위 제외)
  const hasHalfStar = rating - fullStars === 0.5; // 절반 별이 있는지 여부

  // 별 아이콘 컴포넌트 배열 생성
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<StyledStar key={i} size={size} />);
    } else if (hasHalfStar && i === fullStars) {
      stars.push(<StyledHalfStar key={i} size={size} />);
    } else {
      stars.push(<StyledEmptyStar key={i} size={size} />);
    }
  }

  return <StarContainer>{stars}</StarContainer>; 
};

export default StarRating;