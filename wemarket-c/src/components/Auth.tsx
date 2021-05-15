import React from 'react';
import { css } from '@emotion/css/macro';
import styled from '@emotion/styled/macro';

const E = {
  style: css`
    color: rgb(204, 76, 76);
  `,
  style2: css({ color: 'green' }),
  Styled1: styled.div<{ color: string }>`
    color: ${(props) => props.color};
    background-color: ${(props) => props.theme.colors.mainColor};
  `,
};

function Auth() {
  return (
    <>
      <E.Styled1 color="yellow">test0</E.Styled1>
      <div className={E.style}>test</div>
      <div className={E.style2}>he</div>
    </>
  );
}

export default Auth;
