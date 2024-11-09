"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';
import { Button } from '../../../components/ui/button';

const Navbar = () => {
    const navItems = [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
       { label: "RoadMaps", href: "/roadmap" },
       { label: "Study", href: "/study" },
       { label: "Resume", href: "/resume" },
        // { label: "Courses", href: "/courses" },
        // { label: "Profile", href: "/userprofile" },
    ];
    
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const toggleNavbar = () => {    
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    return (
        <nav className="sticky top-0 z-50 py-4 bg-gradient-to-b from-gray-900 to-gray-800 border-b border-gray-700 backdrop-blur-lg">
            <div className="container mx-auto px-4 relative lg:text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <span className="text-xl font-semibold text-white tracking-tight">SkillSync</span>
                    </div>
                    <ul className="hidden lg:flex ml-14 space-x-12 text-gray-200">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} className="hover:text-gray-400 transition-colors">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden lg:flex">
                        <SignedOut>
                            <Button className="bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                                <SignInButton />
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleNavbar} className="text-gray-200">
                            {mobileDrawerOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-gray-900 w-full p-6 flex flex-col items-center lg:hidden">
                        <ul className="flex flex-col">
                            {navItems.map((item, index) => (
                                <li key={index} className="py-4">
                                    <Link href={item.href} className="text-gray-200 hover:text-gray-400 transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <SignedOut>
                            <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                                <SignInButton />
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton className="mt-4" />
                        </SignedIn>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
