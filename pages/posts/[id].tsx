import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

import AddComment from '../../components/AddComment';

import styled from 'styled-components';
import { IComment } from '../../interfaces/post';
import MainLayout from '../../components/MainLayout';

const Item = styled.div`
    padding: 1rem;
`;

const Title = styled.h1`
    margin: 0;
    padding: 0;
    color: #000;
`;

const Text = styled.p`
    padding-top: 10px;
    word-wrap: break-word;
    color: #738a94;
`;

const CommentsLabel = styled.div`
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const Comment = styled.div`
    width: 35%;
    padding: 1rem;
    background-color: darkgray;
    border-radius: 15px;
    margin-bottom: 0.5rem;
    font-weight: 600;
`;

interface IPost {
    title: string;
    body: string;
    id: number;
    comments: Array<IComment>;
}

const Post = ({ data }: { data: IPost }) => {
    const router = useRouter();

    const [comment, setComment] = useState('');

    const handleAddComment = async () => {
        if (comment.trim().length > 0) {
            const options = { postId: data.id, body: comment };

            const response = await axios.post('https://simple-blog-api.crew.red/comments', options);

            if (response.status === 201) {
                setComment(() => '');
                NotificationManager.success('Your comment has been added!');

                router.push(`/posts/${data.id}`);
            } else {
                NotificationManager.error('Error!');
            }
        } else {
            NotificationManager.error('Fill the field!');
        }
    };

    return (
        <MainLayout>
            <Item>
                <Title>{data.title}</Title>
                <Text>{data.body}</Text>
                <CommentsLabel>{data.comments.length > 0 ? 'Comments:' : 'No comments yet'}</CommentsLabel>
                {data.comments && data.comments.map((item) => <Comment key={item.id}>{item.body}</Comment>)}
                <AddComment setComment={setComment} handleAddComment={handleAddComment} />
            </Item>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data } = await axios.get<IPost>(`https://simple-blog-api.crew.red/posts/${ctx.query.id}?_embed=comments`);

    return {
        props: { data },
    };
};

export default Post;
