import React, {useRef} from 'react';
import logo from './logo.svg';
import {AppHeader, AppLogo, Main, Section, StyledApp} from "./StyledApp";
import Footer from "./Components/Footer/Footer";
import LoginForm from "./Components/LoginForm/LoginForm";
import Users from "./Components/Users/Users";
import styled from "styled-components";
import {useSelector} from "react-redux";
import UserFormContainer from "./Components/UserForm/UserFormContainer";

export const StyledFetching = styled.div`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(250,250,250, 0.5);
`;


const App = () => {
    const isFetching = useSelector(state => state.usersState.isFetching);
    const token = useSelector(state => state.authState.token);
    const toForm = useRef(null)
    const executeScroll = () => window.scrollTo(0, toForm.current.offsetTop);
    console.log(toForm)
    return (
        <StyledApp>
            <AppHeader className="App-header">
                <AppLogo src={logo} className="App-logo" alt="logo"/>
                <h1>Webim Test App</h1>
                <div>▼</div>
            </AppHeader>
            <Main>
                <Section>
                    <LoginForm/>
                </Section>
                {token ?
                    <React.Fragment>
                        <Section ref={toForm}>
                            <UserFormContainer/>
                        </Section>
                        <Section>
                            <Users scrollToForm={executeScroll}/>
                        </Section>
                        <button onClick={executeScroll}>top</button>
                    </React.Fragment>
                    : null
                }
            </Main>
            <Footer/>
            {isFetching ? <StyledFetching/> : null}
        </StyledApp>
    );
}

export default App;
