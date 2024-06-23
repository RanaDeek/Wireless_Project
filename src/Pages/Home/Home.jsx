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

        <p>A mobile network (also wireless network) route's communications in the form of radio waves to and from users. It is composed of base stations that each cover a delimited area or "cell." When joined together these cells provide radio coverage over a wide geographic area.</p>        <button onClick={() => openUrl('https://people.cs.umass.edu/~arun/cs453/lectures/Chapter6.pdf')}>Read More</button>
      </div>
      <div className='Right'>
        <img src={PIC} alt="Wireless Penetration Test" />
      </div>
    </div>
  );
}

export default Home;
