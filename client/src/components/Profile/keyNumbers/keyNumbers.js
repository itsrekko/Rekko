import React from "react";
import styled from "styled-components";
import { KeyNumber } from "./keyNumber";

const ProfileDetailUl = styled.ul`
  display: flex;
  margin: 0 auto;
  @media only screen and (max-width: 735px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 12px 0;
    border-top: 1px solid var(--ins-border-primary);
  }
`;
const KeyNumberDiv = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
`;
export function KeyNumbers() {
  return (
    <KeyNumberDiv>
      <ProfileDetailUl>
        <KeyNumber label="rekkos" number={72} />
        <KeyNumber label="saved" number={23} />
      </ProfileDetailUl>
    </KeyNumberDiv>
  );
}
