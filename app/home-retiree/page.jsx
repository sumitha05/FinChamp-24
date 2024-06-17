import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LearnMoreCard from '../../components/home/learnmore';
import FinanceTopics from '../../components/home/finance-topics';
import Headlines from "../../components/home/headlines"
import "../../styles/pages/home-student/homes.css";
import PhotoCards from '../../components/Photocards';
import Chatbot from "@/app/chatBot";


import StockPriceChecker from '../../components/home/stockprice';

const HomeRetiree = () => {
  const studentOpportunitiesUrl = 'home-retiree/retiree-opportunities';

  return (
    <div>
      <Navbar />
      <div className='first-container'>  

        <StockPriceChecker/>   
         <div className="home-cards"> {/* Use directly from CSS */}
      
        <FinanceTopics />
      </div>
  

      </div>    
        
 
      <div className="student-loan"> {/* Use directly from CSS */}
        <LearnMoreCard
             title="Retirees Opportunities"
        description="Explore various opportunities available for retirees."   
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
      
      <Footer />
      <Chatbot/>
    </div>
    
  );
};

export default HomeRetiree;
