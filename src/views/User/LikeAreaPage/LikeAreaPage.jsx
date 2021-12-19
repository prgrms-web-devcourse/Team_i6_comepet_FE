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
import useSWR, { mutate } from 'swr';
import LikeAreaButton from './LikeAreaButton';
import { AUTH_ERROR } from '@/utils/constants';

const LikeAreaPage = () => {
  const { data: user } = useSWR('/me/areas', GET);
  const { data: placeData } = useSWR('/cities', GET);
  const [initialInterestAreas, setInitialInterestAreas] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDefaultArea, setIsDefaultArea] = useState(true);

  useEffect(() => {
    setIsToggled(user?.checked);
    setInitialInterestAreas(user?.areas);
    initialInterestAreas?.length > 0 && setIsDefaultArea(false);
  }, [user]);

  const handleOnClick = () => {
    initialInterestAreas?.length > 0 && setIsDefaultArea(false);
    setIsModalVisible(true);
  };

  const handleOnDelete = async ({ target }) => {
    const deleteId = target.closest('button').dataset.id;

    if (!deleteId) {
      return;
    }

    await DELETE(`/me/areas/${deleteId}`);
    alert('관심지역이 삭제되었습니다');
    mutate('/me/areas');
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
    try {
      const selectedAreas = initialInterestAreas?.map(({ townId, defaultArea }) => {
        return { townId, defaultArea };
      });
      const save = { areas: selectedAreas, notification: isToggled };
      if (isNotChanged(user, save)) {
        alert('저장할 내용이 없습니다.');
        return;
      }
      await PUT('/me/areas', save);
      mutate('/me/areas');
      alert('저장되었습니다');
    } catch (error) {
      const detailCode = error.response.data.code;
      if (detailCode === 804) {
        alert('동일한 관심지역을 중복해서 설정할 수 없습니다.');
        return;
      }
      alert(AUTH_ERROR.TRY_AGAIN);
    }
  };

  const isNotChanged = (loadData, saveData) => {
    if (loadData.checked !== saveData.notification) {
      return false;
    } else if (JSON.stringify(loadData.areas) !== JSON.stringify(saveData.areas)) {
      return false;
    }
    return true;
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
            {initialInterestAreas?.length === 0 && (
              <LikeAreaButton onClick={handleOnClick}>
                <StyledAddIcon />
              </LikeAreaButton>
            )}
            {initialInterestAreas?.length === 1 && (
              <LikeAreaButtonWrapper>
                <LikeAreaButton
                  dataNo={initialInterestAreas[0].id}
                  isDefaultArea={initialInterestAreas[0].defaultArea}
                  onDelete={handleOnDelete}>
                  {initialInterestAreas[0].townName}
                </LikeAreaButton>
                <LikeAreaButton onClick={handleOnClick}>
                  <StyledAddIcon />
                </LikeAreaButton>
              </LikeAreaButtonWrapper>
            )}
            {initialInterestAreas?.length === 2 &&
              initialInterestAreas?.map(({ id, townId, townName, defaultArea }) => {
                return (
                  <LikeAreaButton
                    key={townId}
                    dataNo={id}
                    isDefaultArea={defaultArea}
                    onDelete={handleOnDelete}>
                    {townName}
                  </LikeAreaButton>
                );
              })}
          </SelectedAreaWrapper>
          <Button type="submit" width="60%" height="4rem" bgColor="normalOrange" margin="auto">
            저장하기
          </Button>
          {isModalVisible && (
            <LikeAreaModal
              placeData={placeData}
              checkOut={getSelectedTown}
              onClose={() => setIsModalVisible(false)}
              isDefaultArea={isDefaultArea}
            />
          )}
        </Form>
      </LikeAreaWrapper>
    </Wrapper>
  );
};

export default LikeAreaPage;

const LikeAreaButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

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
  margin: 2rem 2.4rem 0 2.4rem;
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
