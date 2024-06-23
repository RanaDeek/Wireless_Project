import React, { useState } from 'react';
import PIC from '../../assets/Internet-WiFi-Setup-Maintenance-02.png';
import "./Transmission_Power.css"
function Transmission_Power() {
  const [data, setData] = useState({
    PathLoss: '',
    Frequency: '',
    Transmitter_Antenna_Gain: '',
    Receiver_Antenna_Gain: '',
    DataRate: '',
    Antenna_Feed_Line_Loss: '',
    Other_Losses: '',
    Feed_Margin: '',
    Receiver_Amplifier_Gain: '',
    Noise_Figure_Totals: '',
    Noise_Temp: '',
    BER: '',
    Modulation_Type: '',
    Link_Margin: '',
  });
  const [results, setResults] = useState({
    Transmitted_Power: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };
  const bpskQpskMap = {
    1.0e-0: 0.0,
    1.0e-1: 0.0,
    1.0e-2: 4.0,
    1.0e-3: 7.0,
    1.0e-4: 8.0,
    1.0e-5: 9.7,
    1.0e-6: 10.7,
    1.0e-7: 11.5,
    1.0e-8: 12.0
  };

  const eightPskMap = {
    1.0e-0: 0.0,
    1.0e-1: 0.0,
    1.0e-2: 7.0,
    1.0e-3: 10.0,
    1.0e-4: 12.0,
    1.0e-5: 13.0,
    1.0e-6: 14.0,
    1.0e-7: 14.5,
    1.0e-8: 15.0
  };

  const sixteenPskMap = {
    1.0e-0: 0.0,
    1.0e-1: 4.0,
    1.0e-2: 11.0,
    1.0e-3: 14.5,
    1.0e-4: 16.0,
    1.0e-5: 17.0,
    1.0e-6: 18.0,
    1.0e-7: 19.0,
    1.0e-8: 20.0
  };
  const handleCalculate = (e) => {
    e.preventDefault();

    const M = parseFloat(data.Link_Margin);
    const Temp = parseFloat(data.Noise_Temp);
    const Nf = parseFloat(data.Noise_Figure_Totals);
    const Rate = parseFloat(data.DataRate);
    const LP = parseFloat(data.PathLoss);
    const LfMargin = parseFloat(data.Feed_Margin);
    const Lf = parseFloat(data.Antenna_Feed_Line_Loss);
    const Other = parseFloat(data.Other_Losses);
    const Gt = parseFloat(data.Transmitter_Antenna_Gain);
    const Gr = parseFloat(data.Receiver_Antenna_Gain);
    const Ar = parseFloat(data.Receiver_Amplifier_Gain);
    const BER = parseFloat(data.BER);
    const modulationType = data.Modulation_Type; // Assuming a default modulation type or you have a way to determine it

    let selectedMap = null;
    if (modulationType === 'BPSK/QPSK') {
      selectedMap = bpskQpskMap;
    } else if (modulationType === '8PSK') {
      selectedMap = eightPskMap;
    } else if (modulationType === '16PSK') {
      selectedMap = sixteenPskMap;
    }
    if (selectedMap) {
      const ebOverNo = findClosestEbNo(BER, selectedMap);
      const powerR = M - 228.6 + Temp + Nf + Rate + ebOverNo;
      console.log(M + " " + " " + Temp + Nf + " " + Rate + " " + ebOverNo + " ");
      console.log(powerR);
      const powerT = powerR + LP + LfMargin + Lf + Other - Gt - Gr - Ar;
      setResults({ Transmitted_Power: powerT + " dB" });
    } else {
      setResults({ Transmitted_Power: "Invalid modulation type selected." });
    }

  }
  const findClosestEbNo = (ber, map) => {
    let closestKey = null;
    let minDifference = Number.MAX_VALUE;
    for (let keyStr in map) {
      let key = parseFloat(keyStr);
      let difference = Math.abs(key - ber);
      if (difference < minDifference) {
        minDifference = difference;
        closestKey = key;
      }
    }
    console.log("Input BER:", ber);
    console.log("Closest Key:", closestKey);
    console.log("Value at Closest Key:", map[closestKey]);
    return map[closestKey];
  };


  return (
    <div className='Hm'>
      <div className={`Left padding-left  ${results.Transmitted_Power ? 'pad2' : 'pad4'}`}>
        <h2>Transmission Power</h2>
        <form onSubmit={handleCalculate} style={{ display: 'grid', gridTemplateColumns: '1fr', columnGap: '5px' }}>

          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="PathLoss">Path Loss</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Path Loss in DB"
                value={data.PathLoss}
                name='PathLoss'
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Frequency">Frequency</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Frequency in DB"
                value={data.Frequency}
                name='Frequency'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Transmitter_Antenna_Gain">Transmitter Antenna Gain</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter At in DB"
                value={data.Transmitter_Antenna_Gain}
                name='Transmitter_Antenna_Gain'
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Receiver_Antenna_Gain">Receiver Antenna Gain</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Ar in DB"
                value={data.Receiver_Antenna_Gain}
                name='Receiver_Antenna_Gain'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="DataRate">Data Rate</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Data Rate in DB"
                value={data.DataRate}
                name='DataRate'
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Antenna_Feed_Line_Loss">Antenna Feed Line Loss</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Feed Loss in DB"
                value={data.Antenna_Feed_Line_Loss}
                name='Antenna_Feed_Line_Loss'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Other_Losses">Other Losses</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Other Losses in DB"
                value={data.Other_Losses}
                name='Other_Losses'
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Feed_Margin">Feed Margin</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Feed Margin in DB"
                value={data.Feed_Margin}
                name='Feed_Margin'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Receiver_Amplifier_Gain">Receiver Amplifier Gain</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Amp.Gain in DB"
                value={data.Receiver_Amplifier_Gain}
                name='Receiver_Amplifier_Gain'
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Noise_Figure_Totals">Noise Figure Totals</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Noise Figure in DB"
                value={data.Noise_Figure_Totals}
                name='Noise_Figure_Totals'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='in' style={{ display: 'flex', gap: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Noise_Temp">Noise Temp</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Noise Temp in DB"
                value={data.Noise_Temp}
                name='Noise_Temp'
                onChange={handleChange}
              />
            </div>
            <div className='BER' style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="BER">BER</label>
              <input d="probability" className="form-control"
                placeholder="Enter BER in DB"
                value={data.BER}
                name='BER'
                onChange={handleChange} />
            </div>

          </div>
          <div className='in' style={{ display: 'flex', gap: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Link_Margin">Link Margin</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Link Margin in DB"
                value={data.Link_Margin}
                name='Link_Margin'
                onChange={handleChange}
              />
            </div>
            <div className='type' style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
              <label htmlFor="Modulation_Type">Modulation Type</label>
              <select id="probability" className="form-control"
                value={data.Modulation_Type}
                name='Modulation_Type'
                onChange={handleChange}>
                <option value="" selected>Selcect Modulation_Type</option>
                <option value="BPSK/QPSK">bpskQpskMap</option>
                <option value="8PSK">eightPskMap</option>
                <option value="16PSK">sixteenPskMap</option>
              </select>

            </div>
          </div>


          <button type="submit" className="btn btn-primary win2">Calculate</button>
        </form>
        {results.Transmitted_Power &&
          <div className="result">
            <h3>Results</h3>
            <ul>
              <p className='top'>
                Transmitted Power: {results.Transmitted_Power} Watts
              </p>
            </ul>
          </div>
        }
      </div>
      <div className='Right padding'>
        <img src={PIC} alt="Wireless Penetration Test" />
      </div>
    </div>
  );
}

export default Transmission_Power;
