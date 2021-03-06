import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "components/Icon";
import { colors } from "styles/theme";

const States = {
  default: "default",
  loading: "loading",
  done: "done",
};

export const Spinner = ({ loading = false, ...rest }) => {
  const [state, setState] = useState(States.default);

  useEffect(() => {
    if (state === States.default && loading) {
      setState(States.loading);
    } else if (state === States.loading && !loading) {
      setState(States.done);
      setTimeout(() => {
        setState(States.default);
      }, 3000);
    }
  }, [state, loading]);

  return (
    <SpinnerContainer {...rest}>
      <Svg isShown={state === States.loading} />
      <Icon
        icon="check"
        size="sm"
        color="green"
        style={{ opacity: state === States.done ? 1 : 0 }}
      />
    </SpinnerContainer>
  );
};

const Svg = ({ isShown }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    className="loading-svg"
    style={{ opacity: isShown ? 1 : 0, position: "absolute" }}
  >
    <defs>
      <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
        <stop stopColor={colors.primary} stopOpacity="0" offset="0%" />
        <stop stopColor={colors.primary} stopOpacity=".631" offset="63.146%" />
        <stop stopColor={colors.primary} offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)">
        <path
          d="M36 18c0-9.94-8.06-18-18-18"
          id="Oval-2"
          stroke="url(#a)"
          strokeWidth="2"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
        <circle fill={colors.primary} cx="36" cy="18" r="1">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </g>
  </svg>
);

const SpinnerContainer = styled.div`
  .icon,
  .loading-svg {
    transition: opacity 0.2s ease;
  }
`;
