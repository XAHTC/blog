import Link from 'next/link';
import { useRef } from 'react';

import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
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
    padding: 0.5rem;
    cursor: pointer;
    outline: none;
    transition: background-color 0.1s linear, color 0.1s linear;
    &:hover {
        background-color: darkblue;
        color: white;
    }
`;

interface IAddComment {
    setComment: any;
    handleAddComment: () => void;
}

const AddComment = ({ setComment, handleAddComment }: IAddComment) => {
    const commentRef = useRef();

    const handleBody = () => {
        // @ts-ignore
        setComment(commentRef.current.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddComment();
        // @ts-ignore
        commentRef.current.value = '';
    };

    return (
        <Form>
            <div>
                <FormInput ref={commentRef} onChange={handleBody}></FormInput>
            </div>
            <div>
                <Button type="submit" onClick={handleSubmit}>
                    Add Comment
                </Button>
                <Link href={'/'}>
                    <Button>Back to posts</Button>
                </Link>
            </div>
        </Form>
    );
};

export default AddComment;
