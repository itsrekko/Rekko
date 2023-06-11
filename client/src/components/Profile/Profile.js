import React from "react";
import styled from "styled-components";
import { DesktopOnly, MobileOnly } from "../../utils/mobile";
import { Button } from "./Button";
import { KeyNumbers } from "./keyNumbers/keyNumbers";

const Header = styled.header`
  margin-bottom: 44px;
  background: hsl(0, 0%, 100%);
  color: hsl(0, 0%, 0%);
  @media only screen and (max-width: 735px) {
    display: block;
  }
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 30px;
  @media only screen and (max-width: 735px) {
    display: flex;
    padding: 14px;
    column-gap: 0px;
  }
`;
const ProfilePic = styled.div`
  height: 160px;
  margin: 0 auto;
  @media only screen and (max-width: 735px) {
    width: 77px;
    height: 77px;
  }
`;
const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 1000px;
  border: 1px solid hsl(0, 0%, 0%);
  @media only screen and (max-width: 735px) {
    width: 100%;
    height: 100%;
  }
`;
const ProfileH2 = styled.h2`
  font-size: 28px;
  font-weight: 300;
  @media only screen and (max-width: 735px) {
    display: inline-block;
    margin-bottom: 12px;
  }
  text-align: center;
`;
const ProfileIcon = styled.span`
  margin-left: 8px;
  @media only screen and (max-width: 735px) {
    display: inline-block;
  }
`;
const ProfileButtonWrap = styled.div`
  @media only screen and (max-width: 735px) {
    display: block;
    margin-left: 0px;
  }
`;
const ProfileTitle = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 735px) {
    display: block;
  }
`;

const ProfileDescriptionH1 = styled.h1`
  font-weight: 600;
  line-height: 24px;
  @media only screen and (max-width: 735px) {
    line-height: 20px;
  }
`;
const ProfileDescriptionSpan = styled.span`
  font-weight: 400;
  line-height: 24px;
  @media only screen and (max-width: 735px) {
    line-height: 20px;
  }
`;
const ProfileDescriptionA = styled.a`
  color: hsl(209, 100%, 21%);
`;
const ProfileDescriptions = styled.div`
  @media only screen and (max-width: 735px) {
    padding-left: 16px;
    padding-bottom: 21px;
    font-size: 14px;
    margin-bottom: 0px !important;
  }
`;
const ProfileRow = styled.div`
  margin: 0 auto; 
`;

export function Profile() {
  return (
    <Header>
        <ProfilePic>
          <ProfileImg src="/images/profile-logo.jpg" alt="profile-logo" />
        </ProfilePic>
          <ProfileRow>
              <ProfileH2>apple</ProfileH2>
          </ProfileRow>
    </Header>
  );
}
Profile.defaultProps = {
  profileImage: "/images/profile-logo.jpg"
};
