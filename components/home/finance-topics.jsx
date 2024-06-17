import React from 'react';
import FinanceCards from "./finance-cards";
import "../../styles/components/home/finance-topics.css";

import stock from "../../public/assets/stock.png";
import comparsion from "../../public/assets/finance-topics/comparison.png";
import loan from "../../public/assets/finance-topics/loan.png";
import retirement from "../../public/assets/finance-topics/pension.png";
import investment from "../../public/assets/finance-topics/portfolio.png";
import insurance from "../../public/assets/insurance.png";
import personal from "../../public/assets/finance-topics/personal.png";
import bank from "../../public/assets/finance-topics/transaction.png";

const Topics = [
  {
    topic: "Stocks",
    imageUrl: stock,
    url: "/courses",
  },
  {
    topic: "Loans",
    imageUrl: loan,
    url: "/courses",
  },
  {
    topic: "Investment",
    imageUrl: investment,
    url: "/courses",
  },
  {
    topic: "Insurance",
    imageUrl: insurance,
    url: "/courses",
  },
  {
    topic: "Bank",
    imageUrl: bank,
    url: "/courses",
  },
  {
    topic: "Finance",
    imageUrl: personal,
    url: "/courses",
  },
  {
    topic: "Comparsions",
    imageUrl: comparsion,
    url: "/comparisons",
  },
  {
    topic: "Retirement",
    imageUrl: retirement,
    url: "/courses",
  },
];

const FinanceTopics = () => {
  return (
    <div className="finance-topics">
      {Topics.map((topic, index) => (
        <FinanceCards key={index} {...topic} />
      ))}
    </div>
  );
};

export default FinanceTopics;
