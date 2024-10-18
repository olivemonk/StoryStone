'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@nextui-org/button';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    // NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@nextui-org/navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    const { isSignedIn } = useUser();

    const MenuList = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Create story',
            path: '/create-story',
        },
        {
            name: 'Explore stories',
            path: '/explore-stories',
        },
        {
            name: 'Contact us',
            path: '/contact-us',
        },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar
            maxWidth="2xl"
            onMenuOpenChange={setIsMenuOpen}
            className="items-start flex"
        >
            <NavbarContent className="text-primary font-bold" justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                    className="md:hidden"
                />
                <NavbarBrand>
                    <Image src="/logo.svg" alt="logo" width={30} height={30} />
                    <h2 className="font-bold text-2xl text-primary ml-3 hidden md:flex">
                        StoryStone
                    </h2>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="center" className="hidden md:flex">
                {MenuList.map((item, index) => (
                    <NavbarItem
                        className="text-primary text-lg font-semibold"
                        key={index}
                    >
                        <Link href={item.path}>{item.name}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <Link href={'/dashboard'}>
                    <Button size="sm" className="sm:hidden" color="primary">
                        {isSignedIn ? 'Dashboard' : 'Get Started'}
                    </Button>
                </Link>
                <Link href={'/dashboard'}>
                    <Button className="hidden sm:flex" color="primary">
                        {isSignedIn ? 'Dashboard' : 'Get Started'}
                    </Button>
                </Link>
                <UserButton />
            </NavbarContent>
            <NavbarMenu className="text-primary text-lg font-semibold">
                {MenuList.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link href={item.path}>{item.name}</Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default Header;
