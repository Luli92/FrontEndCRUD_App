import React from "react";

import { StyledDiv } from "./styled";

export const Label = props => {
  const { labeltexts } = props;
  return (
    <StyledDiv>
      <h1>{labeltexts[0]}</h1>
      <h1>{labeltexts[1]}</h1>
      <h1>{labeltexts[2]}</h1>
      <h1>{labeltexts[3]}</h1>
    </StyledDiv>
  );
};
