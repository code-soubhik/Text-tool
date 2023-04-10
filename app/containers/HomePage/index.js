/**
 *
 * HomePage
 *
 */

import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Container, Main, TextBox, ButtonContainer, Preview, Data, Section, DataInput, Card, CardData, Summary, MobileSummary, MobilePara} from './Styling';
import H1 from '../../components/H1/index'
import H2 from '../../components/H2/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Button = styled.button`
  box-sizing: border-box;
  border: 0;
  border-radius: 10px;
  color:black;
  padding:15px 25px;
  background: #dab4ff;
  display: flex;
  align-items: center;
  gap: 0.6em;
  font-weight: bold;
  width:fit-content;
  &:active{
    background:black;
    color:white;
  }
  @media (max-width: 1120px) {
    padding: 15px 22px;
    font-size: 14px;
  }
  @media (max-width : 1024px){
    white-space: nowrap;
  }
  @media (max-width : 768px){
    font-size:13px;
    font-weight:600;
    padding: 10px 20px
  }
`

export function HomePage() {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const [text, setText] = useState('Nothing to preview..');
  const [wordCount, setWordCount] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const textBoxValue = useRef(null);

  const handleChange = (val) => {
    if(val==""){
      setText("Nothing to preview..");
    }
    else{
      setText(val);
    }
  }

  const handleUppercase = () => {
    console.log("first kside")
    if(textBoxValue.current.value != ""){
      let newData = text.toUpperCase();
      textBoxValue.current.value = newData;
      setText(newData);
    }
    else{
      toast("Input is empty !");
    }
  }

  const handleLowercase=()=>{
    if(textBoxValue.current.value != ""){
      let newData = text.toLowerCase();
      textBoxValue.current.value = newData;
      setText(newData);
    }
    else{
      toast("Input is empty !");
    }
  }
  
  const handleCopy = () => {
    if(textBoxValue.current.value != ""){
      navigator.clipboard.writeText(text)
        .then(() => {
          toast("Text copied.");
        })
        .catch((err) => {
          toast("Failed to copy text.");
        });
    }
    else{
      toast("Input is empty !");
    }
  };

  const handleExtraSpace=()=>{
    if(textBoxValue.current.value != ""){
    let newText  = text.split(" ").filter(el=>el!=="").join(" ");
    textBoxValue.current.value = newText;
    setText(newText);
    }
  }
  
  const handleClearing=()=>{
    let newData = "";
    textBoxValue.current.value = newData;
    setText('Nothing to preview..');
  }

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="This is the main page of Text tool." />
      </Helmet>
      <Container>
        <Main>
        <ToastContainer />
          <Section>
            <DataInput>
              <H1>Enter the text to analyze below</H1>
              <TextBox ref={textBoxValue} placeholder='Enter the text' 
              onChange={(e)=>{
                handleChange(e.target.value);
                let words = e.target.value.split(" ").filter(el=>el!=="");
                // const readingTime = Math.ceil(words.length / 200);
                const readingTime = (words.length / 200);
                setWordCount(words.length);
                setTimeTaken(readingTime.toFixed(2));
              }}></TextBox>
            </DataInput>
            {
             screen.width > 768 ? <Card>
              <Summary>Summary</Summary>
              <CardData>No. of words : {text!='Nothing to preview..' ? wordCount : 0}</CardData>
              <CardData>No. of characters : {text!='Nothing to preview..' ? text.length : 0}</CardData>
              <CardData>Time to read : {text!='Nothing to preview..' ? timeTaken : 0} min</CardData>
            </Card> :
            <MobileSummary>
              <MobilePara>Words : {text!='Nothing to preview..' ? wordCount : 0}</MobilePara>
              <MobilePara>Character : {text!='Nothing to preview..' ? text.length : 0}</MobilePara>
              <MobilePara>Reading Time : {text!='Nothing to preview..' ? timeTaken : 0} min</MobilePara>
            </MobileSummary>
            
            }
            
          </Section>
          {/* <ButtonContainer>
            <Button onClick={handleUppercase}> {screen.width<425 ? "Uppercase": "Convert To Uppercase"} </Button>
            <Button onClick={handleLowercase}>{screen.width<425 ? "Lowercase": "Convert To Lowercase"} </Button>
            <Button onClick={handleCopy}> {screen.width<425 ? "Copy": "Copy To Clipboard"} </Button>
            <Button onClick={handleExtraSpace}> {screen.width<425 ? "Extra Space": "Clear Extra spaces"} </Button>
            <Button onClick={handleClearing}> {screen.width<425 ? "Clear Text": "Clear Text"}  </Button>
          </ButtonContainer> */}
          {
            screen.width > 425 ?
            <ButtonContainer>
              <Button onClick={handleUppercase}> Convert To Uppercase </Button>
              <Button onClick={handleLowercase}>Convert To Lowercase </Button>
              <Button onClick={handleCopy}> Copy To Clipboard </Button>
              <Button onClick={handleExtraSpace}> Clear Extra spaces</Button>
              <Button onClick={handleClearing}> Clear Text </Button>
            </ButtonContainer>
            :
            <ButtonContainer>
            <Button onClick={handleUppercase}> Uppercase </Button>
            <Button onClick={handleLowercase}>Lowercase </Button>
            <Button onClick={handleExtraSpace}> Extra Space </Button>
            <Button onClick={handleClearing}> Clear Text  </Button>
            <Button onClick={handleCopy}> Copy </Button>
          </ButtonContainer>
          }
          <Preview>
            <H2>Preview</H2>
            <Data>{text}</Data>
          </Preview>
        </Main>
      </Container>
      {/* <FormattedMessage {...messages.header} /> */}
    </>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
