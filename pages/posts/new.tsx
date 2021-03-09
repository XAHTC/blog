import Link from 'next/link';
import { NotificationManager } from 'react-notifications';

import axios from 'axios';
import { useRef, useState } from 'react';

import styled from 'styled-components';
import MainLayout from '../../components/MainLayout';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

const Title = styled.label`
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const Text = styled.label`
    padding-top: 10px;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
    width: 35%;
    background: transparent;
    border-radius: 15px;
    padding: 1rem;
    border: 1px solid black;
    outline: none;
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

const NewPost = () => {
    const titleRef = useRef();
    const bodyRef = useRef();
    const [title, setTitle] = useState('');
    const [body, setbody] = useState('');

    const handleTitle = () => {
        //@ts-ignore
        setTitle(titleRef.current.value);
    };

    const handleBody = () => {
        //@ts-ignore
        setbody(bodyRef.current.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim().length > 0 && body.trim().length > 0) {
            const options = { title, body };

            const response = await axios.post('https://simple-blog-api.crew.red/posts', options);

            //@ts-ignore
            titleRef.current.value = '';
            //@ts-ignore
            bodyRef.current.value = '';
            setTitle('');
            setbody('');

            if (response.status === 201) {
                NotificationManager.success('Your post has been added!');
            } else {
                NotificationManager.error('Fill the fields!');
            }
        } else {
            NotificationManager.error('Fill the fields!');
        }

        //we can use router then if need to redirect
    };

    return (
        <MainLayout>
            <Form>
                <Title>Enter the title</Title>
                <div>
                    <FormInput ref={titleRef} onChange={handleTitle}></FormInput>
                </div>
                <Text>Enter the text</Text>
                <div>
                    <FormInput ref={bodyRef} onChange={handleBody}></FormInput>
                </div>
                <div>
                    <Button type="submit" onClick={handleSubmit}>
                        Add post
                    </Button>
                    <Link href={'/'}>
                        <Button>Back to posts</Button>
                    </Link>
                </div>
            </Form>
        </MainLayout>
    );
};

export default NewPost;
