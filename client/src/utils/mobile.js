import styled from "styled-components";

export const DesktopOnly = styled.div`
  @media only screen and (max-width: 735px) {
    display: none;
  }
`;

export const MobileOnly = styled.div`
  display: none;
  @media only screen and (max-width: 735px) {
    display: block;
  }
`;
