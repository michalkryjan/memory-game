import React, { FC } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const ErrorPage: FC = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Container id="error-page">
            <Title>Oops!</Title>
            <P1>Sorry, an unexpected error has occurred.</P1>
            <P2>
                <i>{error.statusText || error.message}</i>
            </P2>
            <LinkWrapper>
                <Link to={'/setup'}>Go back to game setup</Link>
            </LinkWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    padding: 20px;
    gap: 40px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 50px;
`;

const P1 = styled.p`
    font-size: 28px;
    font-weight: 100;
`;

const P2 = styled.p`
    font-size: 24px;
    color: #adadad;
`;

const LinkWrapper = styled.div`
    font-size: 30px;
    margin-top: 60px;
    color: #6000dc;
    text-decoration: none !important;
`;

export default ErrorPage;
