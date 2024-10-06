// CardSection.jsx
import React from 'react';
import Card from '../Card/Card';
import img from '../../assets/images/images.png';
import './CardSection.css';

const CardSection = ({ onViewDetail }) => {
  const cards = [
    {
      image: img,
      title: 'The Hearts Of Shadow',
      description: 'Brief description of Event 1.',
      details: {
        title: 'The Hearts Of Shadow',
        name: 'Dev Ghildiyal',
        rollNumber: '1234567890',
        category: 'Web Development',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        deployedLink: 'https://example.com',
        futureEnhancement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        twitterLink: 'https://twitter.com/example',
        instagramLink: 'https://www.instagram.com/example',
        githubLink: 'https://github.com/example',
        linkedinLink: 'https://www.linkedin.com/',
      },
    },
    {
      image: img,
      title: 'BilBanao',
      description: 'Brief description of Event 1.',
      details: {
        title: 'BilBanao',
        name: 'Shiwans',
        rollNumber: '1234567890',
        category: 'Web Development',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        deployedLink: 'https://example.com',
        futureEnhancement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        twitterLink: 'https://twitter.com/example',
        instagramLink: 'https://www.instagram.com/example',
        githubLink: 'https://github.com/example',
        linkedinLink: 'https://www.linkedin.com/',
      },
    },
    // Add more cards as needed
  ];

  return (
    <div className="card-section">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          projectDetails={card.details} // Pass project details to Card
          onViewDetail={onViewDetail} // Pass the callback function
        />
      ))}
    </div>
  );
};

export default CardSection;
