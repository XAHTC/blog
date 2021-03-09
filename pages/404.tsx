import Link from 'next/link';

import styled from 'styled-components';
import MainLayout from '../components/MainLayout';

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    margin: 0;
    padding: 0;
    color: #000;
`;

const Button = styled.button`
    font-weight: 700;
    border-radius: 10px;
    margin: 1rem 0.5rem;
    border: 2px solid darkblue;
    padding: 0.5rem 1rem;
    cursor: pointer;
    outline: none;
    transition: background-color 0.1s linear, color 0.1s linear;
    &:hover {
        background-color: darkblue;
        color: white;
    }
`;

export default function Custom404() {
    return (
        <MainLayout>
            <Container>
                <Title>404 - Page Not Found</Title>
                <Link href={'/'}>
                    <Button>Back to posts</Button>
                </Link>
            </Container>
        </MainLayout>
    );
}
