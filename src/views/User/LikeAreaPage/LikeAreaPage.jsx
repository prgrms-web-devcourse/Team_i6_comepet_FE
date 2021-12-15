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
          <Label fontSize="1rem" bgColor="lightGray" margin="0 1rem 0 0">
            관심지역설정
          </Label>
          <Seperator type="horizon" width="100%" bgColor="lightGray" />
        </LabelWrapper>
        <SwitchWrapper>
          <NoticeText>알림을 켜면, 관심 지역의 소식을 바로 확인할 수 있습니다.</NoticeText>
          <Button
            type="button"
            margin="0 4rem 0 1rem"
            bgColor="normalWhite"
            height="2rem"
            width="3.4rem"
            onClick={() => {
              setIsToggled(!isToggled);
            }}>
            {isToggled ? <StyledToggleOnIcon /> : <StyledToggleOffIcon />}
          </Button>
        </SwitchWrapper>
        <SelectedAreaWrapper>
          <BackgroundBox width="40%" height="4rem" boxShadow="light" borderRadius="0">
            <Button
              type="button"
              bgColor="normalWhite"
              borderRadius="0"
              onClick={() => setIsVisible(true)}>
              <StyledAddIcon />
            </Button>
          </BackgroundBox>
          <BackgroundBox width="40%" height="4rem" boxShadow="light" borderRadius="0">
            <Button
              type="button"
              bgColor="normalWhite"
              borderRadius="0"
              onClick={() => setIsVisible(true)}>
              <StyledAddIcon />
            </Button>
          </BackgroundBox>
        </SelectedAreaWrapper>
        <Button type="button" width="60%" height="4rem" bgColor="normalOrange" margin="auto">
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
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const LikeAreaWrapper = styled.div`
  margin: 5.2rem 2.4rem 0 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;
const LabelWrapper = styled.div`
  margin-top: 2rem;
  padding: 0 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
`;
const NoticeText = styled.span`
  margin-left: 4rem;
  color: ${({ theme }) => theme.colors.brand};
  font-weight: bold;
  font-size: 1.2rem;
  flex-grow: 1;
  white-space: nowrap;
`;
const StyledToggleOffIcon = styled(ToggleOffIcon)`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.lightGray};
`;
const StyledToggleOnIcon = styled(ToggleOnIcon)`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.brand};
`;
const SelectedAreaWrapper = styled.div`
  display: flex;
  margin: 3rem;
  justify-content: space-around;
`;
const StyledAddIcon = styled(AddIcon)`
  color: ${({ theme }) => theme.colors.normalOrange};
`;
