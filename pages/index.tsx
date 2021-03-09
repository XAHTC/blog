import { GetServerSideProps } from 'next';
import axios from 'axios';
import Link from 'next/link';

import styled from 'styled-components';
import { IPost } from '../interfaces/post';
import MainLayout from '../components/MainLayout';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 0.5rem;
`;

const Item = styled.div`
    flex: 0 1 30%;
    background: #bcc1c4;
    padding: 1rem;
    border-radius: 15px;
    margin: 1rem 0;

    @media (max-width: 600px) {
        flex: 0 1 100%;
    }
`;

const Title = styled.h1`
    margin: 0;
    padding: 0;
    color: #000;
`;

const Text = styled.p`
    padding-top: 10px;
    word-wrap: break-word;
    color: #37352f;
`;

const PostLink = styled.a`
    text-decoration: none;
    width: 10%;
    font-weight: 600;
    color: darkblue;
    cursor: pointer;
    transition: color 0.3s linear;
    &:hover {
        color: #00009e;
    }
`;

interface IPosts {
    data: Array<IPost>;
}

const Posts = ({ data }: IPosts) => {
    return (
        <MainLayout>
            <Container>
                {data
                    .sort((a, b) => b.id - a.id) // sort for the newest posts firstly
                    .filter((item) => item.title && item.title !== '') //filter for deleting posts without title or title which consist only from spaces
                    .map((item) => (
                        <Item key={item.id}>
                            <Title>{item.title && item.title}</Title>
                            <Text>{item.body && item.body}</Text>
                            <Link href={'/posts/[id]'} as={`/posts/${item.id}`}>
                                <PostLink>To post</PostLink>
                            </Link>
                        </Item>
                    ))}
            </Container>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await axios.get<IPosts>('https://simple-blog-api.crew.red/posts');

    return {
        props: { data },
    };
};

export default Posts;
