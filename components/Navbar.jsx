"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import Modal from './Modal';
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import logo from "@/public/assets/logo.png";
import useri from "@/public/assets/user.svg";
import "@/styles/components/Navbar.css";
import { Button } from './ui/button';

const Navbar = ({ user = {} }) => {
  const router = useRouter(); // Initialize useRouter hook

  const [showNavbar, setShowNavbar] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(user.category || '');

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Programmatically navigate based on selected category
    if (category === 'student') {
      router.push('/home-student');
    } else if (category === 'professional') {
      router.push('/home-working');
    } else if (category === 'retiree') {
      router.push('/home-retiree');
    }

    setIsProfileModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const category = selectedCategory;

    // Programmatically navigate based on selected category
    if (category === 'student') {
      router.push('/home-student');
    } else if (category === 'professional') {
      router.push('/home-working');
    } else if (category === 'retiree') {
      router.push('/home-retiree');
    }

    setIsProfileModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logos">
          <Image src={logo} alt="FinChamp Logo" width={50} height={50}/>
          <span className="logo-text">FinChamp</span>
        </div>
        <div className={`nav-elements ${showNavbar && 'active'}`}>
          <ul>
           <div className='hover'>
           <Button href="/home-student" variant="dropdown" onClick={() => router.push("/home-student")}>Home</Button>
            <Button href='/learn' variant="dropdown" onClick={() => router.push("/courses")}>Learn</Button>
            <Button href='/uni-courses' variant="dropdown" onClick={() => router.push("/uni-courses")}>Courses</Button>
            <Button href='/news' variant="dropdown" onClick={() => router.push("/news")}>News</Button>
            <Button href='/trade' variant="dropdown" onClick={() => router.push("/trade")}>Trade</Button>
            <Button href='/contact-us' variant="dropdown" onClick={() => router.push("/contact-us")}>Contact Us</Button>
            </div> 
          </ul>
        </div>
        <div >
          <div onClick={handleProfileModal} aria-label="User Profile">
            <Button variant="dropdown">Category</Button>
          </div>
          {isProfileModalOpen && (
            <Modal onClose={handleProfileModal}>
              <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="student">Student</option>
                  <option value="professional">Working Professional</option>
                  <option value="retiree">Retiree</option>
                </select>
              </form>
            </Modal>
          )}
        </div>
        <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
              </ClerkLoading>
              <ClerkLoaded>
                <UserButton afterSignOutUrl="/" />
              </ClerkLoaded>
      </div>
      
    </nav>
  );
};

export default Navbar;
