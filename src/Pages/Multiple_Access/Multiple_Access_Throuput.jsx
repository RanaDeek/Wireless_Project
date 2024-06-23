import React, { useState } from 'react';
import PIC from '../../assets/Internet-WiFi-Setup-Maintenance-02.png';
import './MultipleAccessThroughput.css';

function MultipleAccessThroughput() {
  const [data, setData] = useState({
    Bandwidth: '',
    Signal_Propagation: '',
    frame_size: '',
    frame_rate: '',
    technique: ''
  });
  const [results, setResults] = useState({
    Throughput: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    let throughputValue = 0;
    const BW = parseFloat(data.Bandwidth);
    const SigPRO = parseFloat(data.Signal_Propagation);
    const frameRate = parseFloat(data.frame_rate);
    const frameSize = parseFloat(data.frame_size);
    console.log(BW + " " + SigPRO + " " + frameRate + " " + frameSize);

    const T = frameSize / BW;
    const G = frameRate * T;
    const alpha = SigPRO / T;

    console.log(G + " " + alpha + " " + T)
    switch (data.technique) {
      case 'Unslotted Nonpersistent CSMA':
        throughputValue = (G * Math.exp(-2 * alpha * T)) / (G * (1 + 2 * alpha) + Math.exp(-alpha * G)) * 100;
        break;
      case 'Slotted Nonpersistent CSMA':
        throughputValue = (alpha * G * Math.exp(-2 * alpha * T)) / (1 - Math.exp(-alpha * G) + alpha) * 100;
        break;
      case 'Unslotted 1-persistent CSMA':
        throughputValue = (G * (1 + G + alpha * G * (1 + G + ((alpha * G) / 2))) * Math.exp(-G * (1 + 2 * alpha))) /
          (G * (1 + 2 * alpha) - (1 - Math.exp(-alpha * G)) + (1 + alpha * G) * Math.exp(-G * (1 + alpha))) * 100;
        break;
      case 'Slotted 1-persistent CSMA':
        throughputValue = (G * (1 + alpha - Math.exp(-alpha * G)) * Math.exp(-G * (1 + alpha))) /
          ((1 + alpha) * (1 - Math.exp(-alpha * G)) + alpha * Math.exp(-G * (1 + alpha))) * 100;
        break;
      default:
        throughputValue = 0;
    }

    setResults({ Throughput: throughputValue });
  };

  return (
    <div className='Hm'>
      <div className={`Left padding-left  ${results.Throughput ? 'pad2' : 'pad4'}`}>
        <h2>Throughput</h2>
        <form className="form-inline" onSubmit={handleCalculate}>
          <select
            className="custom-select my-1 mr-sm-2"
            value={data.technique}
            onChange={handleChange}
            name='technique'
          >
            <option value="">Select Technique</option>
            <option value="Unslotted Nonpersistent CSMA">Unslotted Nonpersistent CSMA</option>
            <option value="Slotted Nonpersistent CSMA">Slotted Nonpersistent CSMA</option>
            <option value="Unslotted 1-persistent CSMA">Unslotted 1-persistent CSMA</option>
            <option value="Slotted 1-persistent CSMA">Slotted 1-persistent CSMA</option>
          </select>

          <div className="form-group">
            <label htmlFor="Bandwidth">BandWidth</label>
            <input
              type="number"
              className="form-control"
              id="input"
              placeholder="Enter traffic load (G)"
              value={data.input1}
              name="Bandwidth"
              onChange={handleChange}
              disabled={data.technique === ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Signal_Propagation">Alpha (Propagation Delay)</label>
            <input
              type="number"
              className="form-control"
              id="input"
              placeholder="Enter propagation delay (alpha)"
              value={data.Signal_Propagation}
              name="Signal_Propagation"
              onChange={handleChange}
              disabled={data.technique === ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Frame Size">Frame Size</label>
            <input
              type="number"
              className="form-control"
              id="input"
              placeholder="Enter traffic Frame Size"
              value={data.frame_size}
              name="frame_size"
              onChange={handleChange}
              disabled={data.technique === ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="input2">Frame Rate</label>
            <input
              type="number"
              className="form-control"
              id="input"
              placeholder="Enter Frame Rate"
              value={data.frame_rate}
              name="frame_rate"
              onChange={handleChange}
              disabled={data.technique === ""}
            />
          </div>

          <button type="submit" className="btn btn-primary">Calculate</button>

          {results.Throughput && (
            <div className="result">
              <h3>Results</h3>
              <ul>
                <p>
                  Throughput: {results.Throughput} %
                </p>
              </ul>
            </div>
          )}
        </form>
      </div>

      <div className='Right padding'>
        <img src={PIC} alt="Wireless Penetration Test" />
      </div>
    </div>
  )
}

export default MultipleAccessThroughput;
