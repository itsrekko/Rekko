import React from "react";
import styled, { css } from "styled-components";

const Wrap = styled.button`
  all: unset;
  
  box-sizing: border-box;
  white-space: nowrap;


  font-weight: 600;
  font-size: 14px;
  color: var(--ins-primary);
  -webkit-text-fill-color: var(--ins-primary);
  line-height: 18px;
  padding: 5px 9px;
  border-radius: 4px;
  /* ${(props) =>
    props.primary &&
    css`
      background: var(--ins-primary);
      color: white;
      -webkit-text-fill-color: white;
    `} */
  ${({ primary }) =>
    primary &&
    css`
      background: var(--ins-primary);
      color: white;
      -webkit-text-fill-color: white;
    `}
`;

export function Button({ children, content, primary, onClick }) {
  console.log("children", children);
  return (
    <Wrap primary={primary} onClick={onClick}>
      {(children.length > 0 && children) || content}
    </Wrap>
  );
}

Button.defaultProps = {
  content: "Button Label",
  primary: false,
  width: 104,
  height: 28
};
