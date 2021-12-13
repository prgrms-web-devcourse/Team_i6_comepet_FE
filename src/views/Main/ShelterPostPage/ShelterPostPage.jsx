import React, { useState } from 'react';
import styled from '@emotion/styled';
import { LongHeader } from '@/components/Header';
import { SortHeader } from '@/views/Main/SortHeader';
import { PostCard } from '@/components/PostCard';
import { shelterData } from '@/assets/data.js';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Modal } from '@/components/Modal';

const ShelterPostPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { shelters: posts } = shelterData; // useSwr
  const postLength = posts.length;
  // temp
  const city = '서울특별시';
  const town = '도봉구';

  return (
    <Wrapper>
      <LongHeader />
      <ContentWrapper>
        <Notice>
          <NoticeDetails>
            <StyledErrorOutlineIconButton onClick={() => setModalVisible(true)}>
              <StyledErrorOutlineIcon />
            </StyledErrorOutlineIconButton>
            <NoticeBoldText>
              <NoticeButton onClick={() => setModalVisible(true)}>여기</NoticeButton>를 클릭해 관련
              동물 보호법을 숙지해 주세요
            </NoticeBoldText>
          </NoticeDetails>
          <NoticeText>
            공고 중인 동물의 주인께서는 해당 시군구나 보호센터에 문의해 주세요
          </NoticeText>
          {modalVisible && (
            <Modal width="80%" padding="5%" onClose={() => setModalVisible(false)}>
              <ModalContent>
                <b>「동물보호법」 제17조, 시행령7조 및 동법 시행규칙 제20조</b>
                <br />
                <br />
                유기, 유실 동물을 보호하고 있는 경우에는, 소유자 등이 보호조치 사실을 알 수 있도록
                7일 동안 공고하여야 합니다. <br />
                <br />
                공고가 있는 날부터 10일이 경과하여도 소유자 등을 알 수 없는 경우에는 해당 시·도지사
                또는 시장·군수·구청장이 그 동물의 소유권을 취득하게 됩니다.
                <br />
                <br />
                <b>「동물보호법」 제19조 및 동법 시행규칙 제21조</b>
                <br />
                <br />
                시ㆍ도지사와 시장ㆍ군수ㆍ구청장은 동물의 보호비용을 소유자 또는 분양을 받는 자에게
                청구할 수 있습니다.
              </ModalContent>
            </Modal>
          )}
        </Notice>
        <SortHeader city={city} town={town} postLength={postLength} />
        {postLength ? (
          <PostCardList>
            {posts.map(({ id, ...props }) => (
              <PostCardWrapper key={id}>
                <PostCard {...props} height="18.5rem" />
              </PostCardWrapper>
            ))}
          </PostCardList>
        ) : (
          <NoResultText>검색 결과가 없습니다.</NoResultText>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
`;

const Notice = styled.div`
  margin: 1.6rem 0;
`;

const NoticeDetails = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0.8rem 0;
`;

const StyledErrorOutlineIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 0.2rem 0.2rem 0;
`;

const StyledErrorOutlineIcon = styled(ErrorOutlineIcon)`
  width: 1.4rem;
  height: 1.4rem;
  margin: 0;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const NoticeBoldText = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const NoticeButton = styled.button`
  padding: 0;
  font-weight: bold;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const NoticeText = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const ModalContent = styled.p`
  font-size: 1.6rem;
  margin: 0;
  word-break: keep-all;
`;

const ContentWrapper = styled.div`
  padding: 17rem 2.4rem 2.4rem 2.4rem;
`;

const PostCardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
`;

const PostCardWrapper = styled.li`
  justify-self: center;
`;

const NoResultText = styled.div`
  padding: 12rem 4rem;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.normalGray};
`;

export default ShelterPostPage;
