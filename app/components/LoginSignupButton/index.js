/**
 *
 * LoginSignupButton
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
  
const Arrow = styled.div`
  margin-top: 1px;
  width: 10px;
  background: #dab4ff;
  height: 2px;
  position: relative;
  transition: 0.2s;
  color:black;

  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border-width: 0 2px 2px 0;
    border-style: solid;
    display: inline-block;
    top: -3px;
    right: 3px;
    transition: 0.2s;
    padding: 3px;
    transform: rotate(-45deg);
  }
`;

const ButtonComp = styled.button`
  box-sizing: border-box;
  border: 0;
  border-radius: 10px;
  color: #fff;
  padding: 15px 25px;
  background: #dab4ff;
  color:black;
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  font-weight: bold;

  &:hover {
    background-color: #111;
    color:white;
    ${Arrow} {
      background: white;
    }
    ${Arrow}:before {
      right: 0px;
      border-color:white;
    }
  }
`;

function LoginSignupButton(props) {
  let {text} = props;
  return (
  <>
    <ButtonComp>
      {text}
      <ArrowWrapper>
          <Arrow></Arrow>
      </ArrowWrapper>
    </ButtonComp>
  </>
  );
}

LoginSignupButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default memo(LoginSignupButton);
