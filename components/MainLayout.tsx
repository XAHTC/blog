import Link from 'next/link';

import styled from 'styled-components';

const Nav = styled.nav`
    background-color: lightblue;
`;

const List = styled.ul`
    display: flex;
    margin: 0;
    padding: 1.5rem 1rem;
`;

const Item = styled.li`
    list-style: none;
    margin: 0 0.5rem;
`;

const NavLink = styled.a`
    text-decoration: none;
    font-weight: 700;
    cursor: pointer;
    transition: color 0.2s linear;
    &:hover {
        color: darkblue;
    }
`;

const MainLayout = ({ children }) => {
    return (
        <>
            <Nav>
                <List>
                    <Item>
                        <Link href={'/'}>
                            <NavLink>Posts</NavLink>
                        </Link>
                    </Item>
                    <Item>
                        <Link href={'/posts/new'}>
                            <NavLink>Add Post</NavLink>
                        </Link>
                    </Item>
                </List>
            </Nav>
            <main>{children}</main>
        </>
    );
};

export default MainLayout;
