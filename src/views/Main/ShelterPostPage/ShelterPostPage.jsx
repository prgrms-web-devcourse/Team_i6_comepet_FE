import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite';
import { useInView } from 'react-intersection-observer';
import { LongHeader } from '@/components/Header';
import { SortHeader } from '@/views/Main/SortHeader';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Modal } from '@/components/Modal';
import { GET } from '@/apis/axios';

const ShelterPostPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [target, isTargetInView] = useInView();
  const [sortingOrder, setSortingOrder] = useState('DESC');
  const { data, size, setSize } = useSWRInfinite(
    (index) => `/shelter-posts?page=${index + 1}&size=8&sort=id%2C${sortingOrder}`,
    GET
  );

  const posts = data?.reduce((prevData, nextData) => {
    return { shelters: [...prevData.shelters, ...nextData.shelters] };
  }).shelters;

  const isReachingEnd = data && data[data?.length - 1]?.last;
  const city = ''; // temp
  const town = ''; // temp
  const postLength = (data && data[0]?.totalElements) || 0;

  useEffect(() => {
    isTargetInView && setSize(size + 1);
  }, [isTargetInView]);

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
              동물 보호법을 숙지해 주세요.
            </NoticeBoldText>
          </NoticeDetails>
          <NoticeText>공고 중인 동물은 해당 시군구나 보호센터에 문의해 주세요.</NoticeText>
          {modalVisible && (
            <Modal maxWidth="30rem" padding="3rem" onClose={() => setModalVisible(false)}>
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
        <SortHeader
          city={city || '전체'}
          town={town || ''}
          postLength={postLength}
          setSortingOrder={setSortingOrder}
        />
        {(postLength && (
          <PostCardList>
            {posts.map(({ id, ...props }) => (
              <PostCardWrapper key={id}>
                <Link to={`/shelter/${id}`}>
                  <PostCard postId={id} {...props} height="19rem" />
                </Link>
              </PostCardWrapper>
            ))}
          </PostCardList>
        )) || <NoResultText>검색 결과가 없습니다.</NoResultText>}
        <Button
          width="50%"
          margin="6rem auto"
          bgColor="brand"
          disabled={isReachingEnd}
          onClick={() => setSize(size + 1)}>
          {(isReachingEnd && '마지막') || '더보기'}
        </Button>
      </ContentWrapper>
      <div ref={target} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
`;

const Notice = styled.div`
  width: 100%;
  max-width: 61.2rem;
  margin: 1.4rem auto;
  font-size: 1.2rem;

  @media screen and (min-width: 76.8rem) {
    width: 76.8rem;
  }
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const NoticeButton = styled.button`
  padding: 0;
  font-weight: bold;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const NoticeText = styled.div`
  font-size: 1.2rem;
  word-break: keep-all;
  color: ${({ theme }) => theme.colors.brand};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ModalContent = styled.p`
  font-size: 1.6rem;
  margin: 0;
  word-break: keep-all;
  line-height: 2.1rem;
  text-align: center;
`;

const ContentWrapper = styled.div`
  padding: 17rem 2.4rem 2.4rem 2.4rem;
`;

const PostCardList = styled.ul`
  max-width: 73.4rem;
  margin: 0 auto;
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
