import React from 'react';
import PIC from '../../assets/Internet-WiFi-Setup-Maintenance-02.png'
import './Home.css';

function Home() {
  const openUrl = (url) => {
    window.open(url, '_blank'); // Open the URL in a new tab
  };
  return (
    <div className='Hm'>
      <div className='Left padding-top'>
        <h2>WIRELESS AND </h2>
        <h2>MOBILE NETWORKS</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio est, officiis quia, aliquam ad obcaecati, nihil natus reiciendis provident placeat cumque! Quae magni repellat laborum autem quis consectetur eos architecto.</p>
        <button onClick={() => openUrl('https://people.cs.umass.edu/~arun/cs453/lectures/Chapter6.pdf')}>Read More</button>
      </div>
      <div className='Right'>
        <img src={PIC} alt="Wireless Penetration Test" />
      </div>
    </div>
  );
}

export default Home;
