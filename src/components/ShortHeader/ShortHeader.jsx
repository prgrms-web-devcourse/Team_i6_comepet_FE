import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NotificationButton } from '@/components/NotificationButton';
import { SidebarButton } from '@/components/SidebarButton';

const ShortHeader = ({ location, notices, src, nickname }) => {
  return (
    <StyledHeader>
      <GobackWrapper>
        <GobackButton>
          <ArrowBackIosNewIcon />
        </GobackButton>
      </GobackWrapper>
      <CurrentLocation>{location}</CurrentLocation>
      <NotificationWrapper>
        <NotificationButton notices={notices} />
      </NotificationWrapper>
      <SidebarWrapper>
        <SidebarButton src={src} nickname={nickname} />
      </SidebarWrapper>
    </StyledHeader>
  );
};

ShortHeader.defaultProps = {
  location: 'comepet'
};

ShortHeader.propTypes = {
  location: PropTypes.string,
  notices: PropTypes.array,
  src: PropTypes.string,
  nickname: PropTypes.string
};

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 6.4rem;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 1.6rem 1.6rem;
`;
const GobackWrapper = styled.div`
  flex: 2 2 auto;
  text-align: left;
`;
const GobackButton = styled.a`
  padding: 0.1rem 1.2rem 0.1rem 2.4rem;
  width: 50%;
`;
const CurrentLocation = styled.span`
  flex: 7 7 auto;
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.brand};
`;
const NotificationWrapper = styled.div`
  flex: 1 1 auto;
  text-align: center;
`;
const SidebarWrapper = styled.div`
  flex: 1 1 auto;
`;

export default ShortHeader;
