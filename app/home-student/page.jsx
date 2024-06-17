import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LearnMoreCard from '../../components/home/learnmore';
import FinanceTopics from '../../components/home/finance-topics';
import Headlines from "../../components/home/headlines"
import "../../styles/pages/home-student/homes.css";
import PhotoCards from '../../components/Photocards';
import StockPriceChecker from '../../components/home/stockprice';
import Chatbot from "@/app/chatBot";

const HomeStudent = () => {
  const studentOpportunitiesUrl = 'home-student/students-opportunities';

  return (
    <>
      <Navbar />
      <div className='content-container'>
        <div className='page'>
          <div className='first-container'>  
            <StockPriceChecker/>   
            <div className="home-cards"> {/* Use directly from CSS */}
            <FinanceTopics />
            </div>
            </div>   

            <div className="student-loan"> {/* Use directly from CSS */}
            <LearnMoreCard
              title="Student Opportunities"
              description="Explore various opportunities available for students."
              url={studentOpportunitiesUrl}
            />
            </div>
            
            <div className='latest-heading'>
            <Headlines/>
            </div>
            <div className='latest-articles'>
            <h1>Latest Articles</h1>
            <PhotoCards/>
            </div>
        </div>
        
      </div>
      <Footer />
      <Chatbot/>
    </>
  );
};

export default HomeStudent;
