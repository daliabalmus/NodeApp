import styled, { css } from "styled-components";
import { initialTheme } from "../theme/theme";

export const ToastHeaderUI = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ToastMessage = styled.p`
  color: ${initialTheme.light};
  font-size: 12px;
  padding-right: 20px;
`;

export const ToastUI = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: ${initialTheme.primary};
  padding: 16px;
  border-radius: 4px;
  color: ${initialTheme.dark200};
  width: 300px;
  box-shadow: 0px 3px 6px ${initialTheme.shadowLight};
  ${(props) =>
    props.type === "danger" &&
    css`
      background-color: ${initialTheme.danger};
      * {
        color: ${initialTheme.white};
      }
    `}
`;

export const ToastTitleUI = styled.h2`
  font-size: 14px;
  color: ${initialTheme.light};
  text-transform: uppercase;
  font-weight: bold;
  marign-bottom: 0;
  padding-right: 20px;
`;

export const ToastClose = styled.span`
  cursor: pointer;
  top: 15px;
  right: 15px;
  position: absolute;
  i {
    font-size: 12px;
  }
`;
