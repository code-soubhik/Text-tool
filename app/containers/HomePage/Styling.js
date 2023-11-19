import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
    min-height: 81vh;
  }
`;

const Main = styled.main`
  height: 100%;
  width: 100%;
  min-height: 75vh;
  max-width: 95%;
  margin: 5vh auto;
  @media (max-width: 768px) {
    margin: 25px auto;
  }
`;
const TextBox = styled.textarea`
  height: 100%;
  width: 100%;
  min-height: 20vh;
  margin: 2vh 0vw;
  padding: 10px;
  border: 2px solid #c3c3c3;
  border-radius: 8px;
  &:focus {
    border: 2px solid #dab4ff;
    box-shadow: 0px 0px 7px 2px #dab4ff;
    outline-offset: 0px;
    outline: none;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: fit-content;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: fit-content;
    column-gap: 43px;
    row-gap: 15px;
  }
  @media (max-width: 426px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const Preview = styled.div`
  margin-top: 6vh;
`;
const Data = styled.p`
  height: 100%;
  width: 100%;
  font-size: 1.1rem;
  font-family: sans-serif;
`;
const Section = styled.div`
  display: flex;
  gap: 35px;
  @media (max-width: 1165px) {
    margin: 20px;
  }
  @media (max-width: 768px) {
    display: block;
    margin: 10px;
  }
`;
const DataInput = styled.div`
  height: 100%;
  width: 100%;
`;
const Card = styled.div`
  width: 100%;
  height: 100%;
  min-height: 210px;
  max-width: 250px;
  border-radius: 25px 25px 25px 25px;
  border: 2px solid black;
`;
const CardData = styled.div`
  margin: 8px 0px 10px 15px;
`;
const Summary = styled.h2`
  margin: 0px 0px 25px 0px;
  border-radius: 25px 25px 0px 0px;
  text-align: center;
  padding: 10px;
  background: #dab4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const MobileSummary = styled.div`
  margin-top: 0px;
  margin-bottom: 15px;
  @media (max-width: 426px) {
    position: absolute;
    right: 12px;
    border: 2px solid #dab4ff;
    width: 47%;
    padding: 5px;
    margin: 0;
  }
`;

const MobilePara = styled.span`
  margin-right: 25px;
  @media (max-width: 550px) {
    display: block;
    margin: 0 0 7px 0;
  }
`;

export {
  Container,
  Main,
  TextBox,
  ButtonContainer,
  Preview,
  Data,
  Section,
  DataInput,
  Card,
  CardData,
  Summary,
  MobilePara,
  MobileSummary,
};
