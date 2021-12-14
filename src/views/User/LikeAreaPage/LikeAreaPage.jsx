import { useState } from 'react';
import styled from '@emotion/styled';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import AddIcon from '@mui/icons-material/Add';
import { ShortHeader } from '@/components/Header';
import { Label } from '@/components/Label';
import { Seperator } from '@/components/Seperator';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import LikeAreaModal from './LikeAreaModal';

const LikeAreaPage = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Wrapper>
      <ShortHeader location="관심 지역 설정" />
      <LikeAreaWrapper>
        <LabelWrapper>
          <Label fontSize="0.8rem" bgColor="lightGray" margin="0 0.8rem 0 0">
            관심지역설정
          </Label>
          <Seperator type="horizon" width="24rem" bgColor="lightGray" />
        </LabelWrapper>
        <SwitchWrapper>
          <StyledP>알림을 켜면, 관심 지역의 소식을 바로 확인할 수 있습니다.</StyledP>
          <Button
            type="button"
            margin="0 0.4rem 0 4rem"
            bgColor="normalWhite"
            height="2rem"
            width="4rem"
            onClick={() => {
              setIsToggled(!isToggled);
            }}>
            {isToggled ? <StyledToggleOnIcon /> : <StyledToggleOffIcon />}
          </Button>
        </SwitchWrapper>
        <SelectedAreaWrapper>
          <BackgroundBox
            width="10.8rem"
            height="4"
            boxShadow="light"
            borderRadius="0"
            margin="0 1.6rem">
            <Button
              type="button"
              width="10.8rem"
              height="4rem"
              bgColor="normalWhite"
              borderRadius="0"
              onClick={() => setIsVisible(true)}>
              <StyledAddIcon />
            </Button>
          </BackgroundBox>
          <BackgroundBox
            width="10.8rem"
            height="4"
            boxShadow="light"
            borderRadius="0"
            margin="0 1.6rem">
            <Button
              type="button"
              width="10.8rem"
              height="4rem"
              bgColor="normalWhite"
              borderRadius="0"
              onClick={() => setIsVisible(true)}>
              <StyledAddIcon />
            </Button>
          </BackgroundBox>
        </SelectedAreaWrapper>
        <Button type="button" width="26rem" height="4rem" bgColor="normalOrange" margin="auto">
          저장하기
        </Button>
        {isVisible && <LikeAreaModal onClose={() => setIsVisible(false)} />}
      </LikeAreaWrapper>
    </Wrapper>
  );
};

export default LikeAreaPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;
const LikeAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.2rem;
  width: 95%;
  height: 90%;
  justify-content: center;
`;
const LabelWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
`;
const SwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledP = styled.div`
  margin: 0 0 0 0.8rem;
  color: ${({ theme }) => theme.colors.brand};
  font-weight: bold;
  font-size: 0.8rem;
`;
const StyledToggleOffIcon = styled(ToggleOffIcon)`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.lightGray};
`;
const StyledToggleOnIcon = styled(ToggleOnIcon)`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.brand};
`;
const StyledAddIcon = styled(AddIcon)`
  color: ${({ theme }) => theme.colors.normalOrange};
`;
const SelectedAreaWrapper = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: center;
`;
