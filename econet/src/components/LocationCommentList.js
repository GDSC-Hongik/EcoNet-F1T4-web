import styled from "styled-components";

const CommentFrame = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 0px;
`;

const StyledComment = styled.div`
  width: 100%;
  border-bottom: 2px solid #c8c8c8;
  padding: 18px 28px;
  font-size: 15px;
`;

function LocationCommentList({ comments }) {
  return (
    <CommentFrame>
      {comments.map((item) => {
        return <StyledComment key={item.id}>{item.content}</StyledComment>;
      })}
    </CommentFrame>
  );
}

export default LocationCommentList;
