import React from 'react';
import Link from 'next/link';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import MainNews from '../../components/Photocards'; 
import Image from 'next/image';

import "../../styles/pages/news.css"
import Chatbot from "@/app/ChatBot";

const NewsMainPage = () => {


  return (
    <>
      <Navbar />
      <div className="news-main-container">

      <div className='news-mini'> <div className="news-component-box">
          <h1>Explore News</h1>
          <h3>Empowering you with timely Financial News</h3>
        </div>
        </div> 
       

        <ul className="options">
          <li>
            <Link href="/news" passHref legacyBehavior>
            <div>
                 <a>All News</a> 
            </div>
          
            </Link>
          </li>
          <li>
            <Link href="/news/market-news" passHref legacyBehavior>
            <div>
                 <a>Market News</a> 
            </div>
          
            </Link>
          </li>
          <li>
            <Link href="/news/economics-news" passHref legacyBehavior>
             <div>
                <a>Economics News</a>
             </div>
            </Link>
          </li>
          <li>
            <Link href="/news/company-news" passHref legacyBehavior>
              <div>
                <a>Company News</a>  
              </div>
            
            </Link>
          </li>
          <li>
            <Link href="/news/crypto-currency-news" passHref legacyBehavior>
              <div>
                <a>Crypto Currency</a>    
              </div>
            </Link>
          </li>
          <li>
            <Link href="/news/personal-finance-news" passHref legacyBehavior>
              <div>
                <a>Personal Finance</a>  
              </div>
            </Link>
          </li>
        </ul>
        {/* Example of using MarketNews component */}
        <MainNews />

      </div>
       <Footer />
      <Chatbot/>
       
    </>
  );
}

export default NewsMainPage;
