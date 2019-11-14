import React from "react";

import { StyledResponse } from "./styled";

export const ResponseLabel = props => {
  const { message, style } = props;
  return (
    <div>
      <StyledResponse style={{ color: style, fontSize: 12 }}>
        {message}
      </StyledResponse>
    </div>
  );
};
