import { ButtonBox } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonBox type="submit" onClick={() => onClick()}>
      Load more
    </ButtonBox>
  );
};
