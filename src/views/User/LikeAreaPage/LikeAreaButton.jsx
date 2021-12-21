import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const LikeAreaButton = ({ children, dataNo, isDefaultArea, onClick, onDelete }) => {
  return (
    <BackgroundBox width="40%" height="4rem" boxShadow="light" borderRadius="0">
      <Button
        bgColor={isDefaultArea ? 'normalOrange' : 'normalWhite'}
        color={isDefaultArea ? 'normalWhite' : 'lightGray'}
        borderRadius="0"
        onClick={onClick}>
        {children}
      </Button>
      {dataNo && (
        <StyledButton type="button" data-id={dataNo} onClick={onDelete}>
          <StyledCloseRoundedIcon />
        </StyledButton>
      )}
    </BackgroundBox>
  );
};

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  width: 1.8rem;
  height: 1.8rem;
  color: ${({ theme }) => theme.colors.errorBg500};
`;

const StyledButton = styled.button`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 0;
  right: 0.4rem;
`;

LikeAreaButton.propTypes = {
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  isDefaultArea: PropTypes.bool,
  dataNo: PropTypes.number,
  children: PropTypes.node
};

export default LikeAreaButton;
