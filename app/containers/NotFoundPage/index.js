/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import H1 from 'components/H1';
import messages from './messages';

const Container = styled.div`
height:100%;
width:100%;
min-height:85vh;
display: flex;
align-items: center;
justify-content: center;
font-size:2rem;
`
export default function NotFound() {
  return (
    <Container>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </Container>
  );
}
