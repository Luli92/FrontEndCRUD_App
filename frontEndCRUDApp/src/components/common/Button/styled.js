import Styled from "styled-components";
import Button from "@material-ui/core/Button";

export const StyledButton = Styled(Button)`
background-color: ${({ disabled, fill }) => (disabled ? "grey" : fill)};

`;
