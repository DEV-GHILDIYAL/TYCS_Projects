import React from 'react';
import Card from '../Card/Card';
import img from '../../assets/images/images.png';
import './CardSection.css';

const CardSection = () => {
  
  const cards = [
    {
      image: img,
      title: 'Event 1',
      description: 'Brief description of Event 1.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
    {
      image: img,
      title: 'Event 2',
      description: 'Brief description of Event 2.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
    {
      image: img,
      title: 'Event 3',
      description: 'Brief description of Event 3.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
    {
      image: img,
      title: 'Event 3',
      description: 'Brief description of Event 3.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
    {
      image: img,
      title: 'Event 3',
      description: 'Brief description of Event 3.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
    {
      image: img,
      title: 'Event 3',
      description: 'Brief description of Event 3.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
    {
      image: img,
      title: 'Event 3',
      description: 'Brief description of Event 3.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
    {
      image: img,
      title: 'Event 3',
      description: 'Brief description of Event 3.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
    {
      image: img,
      title: 'Event 3',
      description: 'Brief description of Event 3.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
    {
      image: img,
      title: 'Event 3',
      description: 'Brief description of Event 3.',
      location: 'Mumbai',
      time: '10:00 AM - 2:00 PM',
      ngoName:"Ocean Conservancy",
    },
  ];

  return (
    <div className="card-section">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          location={card.location}
          time={card.time}
          ngoName={card.ngoName}
        />
      ))}
    </div>
  );
};

export default CardSection;
