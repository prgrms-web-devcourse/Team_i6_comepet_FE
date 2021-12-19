import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import AddIcon from '@mui/icons-material/Add';
import { ShortHeader } from '@/components/Header';
import { Label } from '@/components/Label';
import { Seperator } from '@/components/Seperator';
import { Button } from '@/components/Button';
import LikeAreaModal from './LikeAreaModal';
import { GET, PUT, DELETE } from '@/apis/axios';
import useSWR from 'swr';
import LikeAreaButton from './LikeAreaButton';

const LikeAreaPage = () => {
  const { data: user } = useSWR('/me/areas', GET);
  const { data: placeData } = useSWR('/cities', GET);
  const [initialInterestAreas, setInitialInterestAreas] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDefaultArea, setIsDefaultArea] = useState(true);

  useEffect(() => {
    setIsToggled(user?.checked);
    setInitialInterestAreas(user?.areas);
    initialInterestAreas?.length > 0 && setIsDefaultArea(false);
  }, [user]);

  const handleOnClick = () => {
    initialInterestAreas?.length > 0 && setIsDefaultArea(false);
    setIsVisible(true);
  };

  const handleOnDelete = async (e) => {
    const deleteId = e.target.dataset.id;
    await DELETE(`/me/areas/${deleteId}`);
    alert('관심지역이 삭제되었습니다');
  };

  const getSelectedTown = async (selectedTown) => {
    setInitialInterestAreas((initialInterestAreas) => {
      if (initialInterestAreas.length > 1) {
        return initialInterestAreas;
      } else {
        return [...initialInterestAreas, selectedTown];
      }
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const selectedAreas = initialInterestAreas?.map(({ townId, defaultArea }) => {
      return { townId, defaultArea };
    });
    const save = { areas: selectedAreas, notification: isToggled };
    await PUT('/me/areas', save);
    alert('관심지역이 등록되었습니다');
  };

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
        <Form onSubmit={handleOnSubmit}>
          <SwitchWrapper>
            <NoticeText>알림을 켜면, 관심 지역의 소식을 바로 확인할 수 있습니다.</NoticeText>
            <Button
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
            {initialInterestAreas?.length === 0 ? (
              <LikeAreaButton onClick={handleOnClick}>
                <StyledAddIcon />
              </LikeAreaButton>
            ) : initialInterestAreas?.length === 1 ? (
              initialInterestAreas?.map(({ id, townName, defaultArea }, index) => {
                return (
                  <React.Fragment key={index}>
                    <LikeAreaButton
                      dataNo={id}
                      isDefaultArea={defaultArea}
                      initialInterestAreas={initialInterestAreas}
                      onDelete={handleOnDelete}>
                      {townName}
                    </LikeAreaButton>
                    <LikeAreaButton onClick={handleOnClick}>
                      <StyledAddIcon />
                    </LikeAreaButton>
                  </React.Fragment>
                );
              })
            ) : (
              initialInterestAreas?.map(({ id, townName, defaultArea }, index) => {
                return (
                  <LikeAreaButton
                    key={index}
                    dataNo={id}
                    isDefaultArea={defaultArea}
                    initialInterestAreas={initialInterestAreas}
                    onDelete={handleOnDelete}>
                    {townName}
                  </LikeAreaButton>
                );
              })
            )}
          </SelectedAreaWrapper>
          <Button type="submit" width="60%" height="4rem" bgColor="normalOrange" margin="auto">
            저장하기
          </Button>
          {isVisible && (
            <LikeAreaModal
              placeData={placeData}
              checkOut={getSelectedTown}
              onClose={() => setIsVisible(false)}
              isDefaultArea={isDefaultArea}
            />
          )}
        </Form>
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
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
