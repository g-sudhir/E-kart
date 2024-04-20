import React, { useRef } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offer from '../Components/Offers/Offer';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import Footer from '../Components/Footer/Footer';

const Shop = () => {
  const newCollectionsRef = useRef(null); // Define a ref in the parent component

  const scrollToNewCollections = () => {
    if (newCollectionsRef.current) {
      newCollectionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Hero scrollToNewCollections={scrollToNewCollections} />
      <Popular />
      <Offer />
      <NewCollections ref={newCollectionsRef} /> {/* Pass the ref as a prop */}
      <NewsLetter />
     
    </div>
  );
};

export default Shop;
