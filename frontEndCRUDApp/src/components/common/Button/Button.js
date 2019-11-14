import React from "react";

import { StyledButton } from "./styled";

export const ButtonComponent = props => {
  const { title, disabled, fill } = props;
  return (
    <StyledButton
      onClick={props.onClick}
      variant="contained"
      disabled={disabled}
      color={fill}
    >
      {title}
    </StyledButton>
  );
};
