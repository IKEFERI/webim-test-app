import styled from "styled-components";

export const StyledApp = styled.div`
  position:relative;
  text-align: center;
`;

export const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
`;

export const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
export const Main = styled.main`
    background-color: #61DAFB;
    min-height: 100vh;
    padding: 60px 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-content: flex-start;
`;
export const Section = styled.section`
    width: 100%;
    margin-bottom: 40px;
`;