
import React, { useState } from 'react'
import PIC from '../../assets/Internet-WiFi-Setup-Maintenance-02.png'
import './Cellular_System.css'
function Cellular_System() {
  const [data, setData] = useState({
    timeslotsPerCarrier: '',
    area: '',
    subscribers: '',
    avgCallsPerDay: '',
    avgCallDuration: '',
    probability: '',
    SIR: '',
    refDistance: '',
    refPower: '',
    pathLossExponent: '',
    receiverSensitivity: '',
    numberOfCoChannels: '',
    Number_of_cell: '',
  });

  const [results, setResults] = useState({
    maximumDistance: '',
    formattedCellSize: '',
    numberOfCellsInServiceArea: '',
    wholeTraffic: '',
    trafficPerCell: '',
    numberOfChannels: '',
    numberofCarrier: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const findIJ = (number) => {
    let target = Math.ceil(number);

    while (true) {
      for (let i = 0; i <= Math.sqrt(target); i++) {
        for (let j = 0; j <= Math.sqrt(target); j++) {
          if (i * i + j * j + i * j === target) {
            return target;
          }
        }
      }
      target++;
    }
  };

  const findClosestIndex = (percentageKey, targetNumber, erlangBTable) => {
    percentageKey = percentageKey.toString() + '%';
    const list = erlangBTable[percentageKey];

    if (!list) {
      throw new Error(`Percentage key "${percentageKey}" not found in the table.`);
    }

    let closestIndex = 0;
    let smallestDifference = Math.abs(list[0] - targetNumber);

    for (let i = 1; i < list.length; i++) {
      const difference = Math.abs(list[i] - targetNumber);
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestIndex = i;
      }
    }

    return closestIndex;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const timeSlotsPerCarrier = parseInt(data.timeslotsPerCarrier);
    const area = parseFloat(data.area);
    const subscribers = parseInt(data.subscribers);
    const avgCallsPerDay = parseInt(data.avgCallsPerDay);
    const avgCallDuration = parseInt(data.avgCallDuration);
    var callDropProbability = parseFloat(data.probability);
    const SIR = parseFloat(data.SIR);
    const refDistance = parseFloat(data.refDistance);
    const refPower = parseFloat(data.refPower);
    const pathLossExponent = parseInt(data.pathLossExponent);
    const receiverSensitivity = parseFloat(data.receiverSensitivity);
    const NB = parseFloat(data.numberOfCoChannels);

    const maximumDistance = Number(
      (
        refDistance /
        Math.cbrt((receiverSensitivity * 10 ** -6) / 10 ** (refPower / 10))
      ).toFixed(3)
    );
    const cellSize =
      ((pathLossExponent * Math.sqrt(3)) / 2) * maximumDistance ** 2;
    const formattedCellSize = Number(cellSize.toFixed(3));
    const numberOfCellsInServiceArea = Math.ceil(
      (area * 10 ** 6) / cellSize
    );
    const wholeTraffic = Number(
      (
        (avgCallsPerDay / (24 * 60)) *
        avgCallDuration *
        subscribers
      ).toFixed(3)
    );

    const trafficPerCell = Number(
      (wholeTraffic / numberOfCellsInServiceArea).toFixed(3)
    );

    const N = Number(
      ((NB * 10 ** (SIR / 10)) ** (2 / pathLossExponent) / 3).toFixed(3)
    );
    const Number_of_cell = findIJ(N);


    const erlangBTable = {
      "0.1%": [
        0.001, 0.048, 0.194, 0.439, 0.762, 1.1, 1.3, 1.7, 2.1, 2.6, 3.1,
        3.7, 4.4, 5.0, 5.4, 6.7, 7.3, 8.0, 8.7, 9.4, 10.1, 10.8, 11.5, 12.2,
        13.0, 13.7, 14.4, 15.2, 15.9, 16.7, 17.4, 18.2, 18.9, 19.7, 20.5,
        21.3, 22.1, 22.9, 23.7, 24.4, 25.2, 26.0, 26.8, 27.6, 28.4, 29.2,
      ],
      "0.2%": [
        0.002, 0.063, 0.249, 0.501, 0.9, 1.3, 1.6, 2.3, 2.9, 3.4, 4.1, 4.6,
        5.3, 5.9, 6.7, 7.3, 8.1, 8.8, 9.6, 10.3, 11.1, 11.8, 12.6, 13.3,
        14.1, 14.8, 15.6, 16.4, 17.2, 17.9, 18.7, 19.5, 20.3, 21.1, 21.9,
        22.7, 23.5, 24.3, 25.1, 25.9, 26.8, 27.6, 28.4, 29.3, 30.1, 31.0,
      ],
      "0.5%": [
        0.005, 0.105, 0.349, 0.701, 1.132, 1.6, 2.1, 2.9, 3.6, 4.2, 4.9,
        5.6, 6.3, 7.0, 7.7, 8.3, 9.1, 9.8, 10.6, 11.4, 12.1, 12.9, 13.6,
        14.4, 15.2, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0, 20.8, 21.6, 22.4,
        23.2, 24.0, 24.8, 25.7, 26.5, 27.3, 28.2, 29.0, 29.9, 30.7, 31.6,
        32.4,
      ],
      "1%": [
        0.01, 0.15, 0.455, 0.869, 1.361, 2.0, 2.7, 3.5, 4.2, 4.8, 5.5, 6.3,
        7.0, 7.7, 8.4, 9.1, 9.9, 10.6, 11.4, 12.2, 12.9, 13.7, 14.5, 15.3,
        16.1, 16.9, 17.7, 18.5, 19.3, 20.1, 20.9, 21.7, 22.5, 23.3, 24.1,
        25.0, 25.8, 26.7, 27.5, 28.4, 29.2, 30.1, 31.0, 31.8, 32.7, 33.6,
      ],
      "1.2%": [
        0.012, 0.16, 0.489, 0.922, 1.431, 2.1, 2.8, 3.6, 4.3, 5.0, 5.7, 6.5,
        7.2, 7.9, 8.6, 9.4, 10.1, 10.9, 11.7, 12.5, 13.2, 14.0, 14.8, 15.6,
        16.4, 17.2, 18.0, 18.8, 19.6, 20.4, 21.2, 22.0, 22.8, 23.7, 24.5,
        25.3, 26.2, 27.0, 27.9, 28.7, 29.6, 30.5, 31.3, 32.2, 33.1, 34.0,
      ],
      "1.3%": [
        0.013, 0.17, 0.505, 0.946, 1.464, 2.2, 2.9, 3.7, 4.4, 5.0, 5.8, 6.5,
        7.3, 8.0, 8.7, 9.4, 10.2, 11.0, 11.8, 12.6, 13.4, 14.2, 15.0, 15.8,
        16.6, 17.4, 18.2, 19.0, 19.9, 20.7, 21.5, 22.3, 23.2, 24.0, 24.8,
        25.7, 26.6, 27.4, 28.3, 29.2, 30.1, 30.9, 31.8, 32.7, 33.6, 34.5,
      ],
      "1.5%": [
        0.015, 0.176, 0.52, 0.968, 1.494, 2.2, 2.9, 3.7, 4.4, 5.2, 5.9, 6.7,
        7.4, 8.1, 8.8, 9.6, 10.4, 11.2, 12.0, 12.8, 13.6, 14.4, 15.2, 16.1,
        16.9, 17.7, 18.5, 19.3, 20.2, 21.0, 21.8, 22.7, 23.5, 24.4, 25.2,
        26.1, 27.0, 27.9, 28.7, 29.6, 30.5, 31.4, 32.3, 33.2, 34.1, 35.0,
      ],
      "2%": [
        0.02, 0.22, 0.715, 1.092, 1.657, 3.0, 3.6, 4.4, 5.0, 5.8, 6.5, 7.3,
        8.1, 8.9, 9.6, 10.4, 11.3, 12.1, 12.9, 13.7, 14.5, 15.3, 16.2, 17.0,
        17.8, 18.6, 19.4, 20.3, 21.1, 21.9, 22.8, 23.6, 24.5, 25.3, 26.2,
        27.1, 27.9, 28.8, 29.7, 30.5, 31.4, 32.3, 33.2, 34.1, 35.0, 36.0,
      ],
      "3%": [
        0.03, 0.282, 1.089, 1.625, 2.218, 3.0, 4.0, 4.8, 5.6, 6.3, 7.1, 7.9,
        8.7, 9.5, 10.3, 11.1, 11.9, 12.8, 13.6, 14.4, 15.3, 16.1, 16.9,
        17.8, 18.6, 19.4, 20.3, 21.1, 22.0, 22.8, 23.7, 24.6, 25.4, 26.3,
        27.2, 28.1, 29.0, 29.8, 30.7, 31.6, 32.5, 33.4, 34.3, 35.2, 36.1,
        37.1,
      ],
      "5%": [
        0.053, 0.47, 1.427, 2.045, 2.881, 4.0, 4.9, 5.6, 6.3, 7.1, 7.9, 8.7,
        9.5, 10.3, 11.2, 12.0, 12.9, 13.7, 14.6, 15.4, 16.3, 17.1, 18.0,
        18.9, 19.7, 20.6, 21.5, 22.4, 23.3, 24.2, 25.1, 26.0, 26.9, 27.8,
        28.7, 29.6, 30.5, 31.4, 32.3, 33.2, 34.2, 35.1, 36.0, 36.9, 37.8,
        38.8,
      ],
      "7%": [
        0.075, 0.552, 1.59, 2.355, 3.149, 4.0, 5.0, 5.7, 6.5, 7.3, 8.1, 8.9,
        9.8, 10.6, 11.5, 12.4, 13.2, 14.1, 15.0, 15.9, 16.8, 17.7, 18.6,
        19.5, 20.4, 21.3, 22.2, 23.1, 24.0, 25.0, 25.9, 26.8, 27.7, 28.6,
        29.5, 30.5, 31.4, 32.3, 33.2, 34.2, 35.1, 36.1, 37.0, 37.9, 38.9,
        39.8,
      ],
      "10%": [
        0.111, 0.674, 1.819, 2.623, 3.454, 5.0, 5.6, 6.4, 7.2, 8.0, 8.8,
        9.7, 10.5, 11.4, 12.2, 13.1, 14.0, 14.9, 15.8, 16.7, 17.6, 18.5,
        19.4, 20.3, 21.2, 22.1, 23.0, 24.0, 24.9, 25.8, 26.7, 27.7, 28.6,
        29.5, 30.5, 31.4, 32.4, 33.3, 34.3, 35.2, 36.2, 37.1, 38.1, 39.0,
        40.0, 41.0,
      ],
      "15%": [
        0.176, 0.885, 2.118, 2.968, 4.01, 5.0, 6.0, 6.8, 7.6, 8.5, 9.4,
        10.2, 11.1, 12.0, 12.9, 13.8, 14.7, 15.6, 16.5, 17.4, 18.3, 19.3,
        20.2, 21.1, 22.1, 23.0, 24.0, 24.9, 25.9, 26.8, 27.8, 28.8, 29.7,
        30.7, 31.7, 32.6, 33.6, 34.6, 35.6, 36.5, 37.5, 38.5, 39.5, 40.5,
        41.5, 42.5,
      ],
      "20%": [
        0.25, 1.134, 2.504, 3.438, 4.61, 6.0, 6.9, 7.8, 8.7, 9.6, 10.5,
        11.4, 12.3, 13.2, 14.1, 15.0, 15.9, 16.9, 17.8, 18.8, 19.7, 20.7,
        21.6, 22.6, 23.5, 24.5, 25.5, 26.5, 27.4, 28.4, 29.4, 30.4, 31.4,
        32.4, 33.4, 34.4, 35.4, 36.4, 37.4, 38.4, 39.4, 40.4, 41.4, 42.4,
        43.5, 44.5,
      ],
      "25%": [
        0.32, 1.426, 2.923, 3.929, 5.189, 6.0, 7.1, 8.0, 9.0, 10.0, 10.9,
        11.8, 12.7, 13.6, 14.6, 15.5, 16.5, 17.4, 18.4, 19.4, 20.4, 21.4,
        22.4, 23.4, 24.4, 25.4, 26.4, 27.4, 28.4, 29.4, 30.4, 31.4, 32.4,
        33.4, 34.5, 35.5, 36.5, 37.5, 38.5, 39.5, 40.6, 41.6, 42.6, 43.7,
        44.7, 45.8,
      ],
      "30%": [
        0.429, 1.732, 3.389, 4.439, 5.693, 6.5, 7.1, 8.1, 9.1, 10.1, 11.1,
        12.1, 13.1, 14.1, 15.1, 16.1, 17.1, 18.1, 19.1, 20.1, 21.1, 22.1,
        23.1, 24.1, 25.1, 26.1, 27.1, 28.2, 29.2, 30.2, 31.3, 32.3, 33.3,
        34.4, 35.4, 36.5, 37.5, 38.6, 39.6, 40.7, 41.7, 42.8, 43.8, 44.9,
        46.0, 47.1,
      ],
    };

    const numberOfChannels = findClosestIndex(callDropProbability, trafficPerCell, erlangBTable) + 1;
    const numberofCarrier = Math.ceil(numberOfChannels / timeSlotsPerCarrier);

    // Input validation
    if (
      !area ||
      !subscribers ||
      !avgCallsPerDay ||
      !avgCallDuration ||
      !callDropProbability ||
      !SIR ||
      !refDistance ||
      !pathLossExponent ||
      !receiverSensitivity
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (
      isNaN(area) ||
      isNaN(subscribers) ||
      isNaN(avgCallsPerDay) ||
      isNaN(avgCallDuration) ||
      isNaN(callDropProbability) ||
      isNaN(SIR) ||
      isNaN(refDistance) ||
      isNaN(pathLossExponent) ||
      isNaN(receiverSensitivity)
    ) {
      alert("Please enter valid numerical values.");
      return;
    }
    setResults({
      maximumDistance,
      formattedCellSize,
      numberOfCellsInServiceArea,
      wholeTraffic,
      trafficPerCell,
      numberOfChannels,
      numberofCarrier,
      Number_of_cell
    });
  };

  return (
    <div className='Hm '>
      <div className={`Left padding-left  ${results.maximumDistance ? 'pad2' : 'pad4'}`}>
        <h2>Cellular System</h2>
        <form onSubmit={handleCalculate}>
          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="timeslotsPerCarrier">#Time Slots per Carrier:
              </label>
              <input type="text" className="form-control" placeholder="Enter Timeslots Per Carrier"
                value={data.timeslotsPerCarrier} name='timeslotsPerCarrier' onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="area">Total Area (sq km)</label>
              <input type="text" className="form-control" placeholder="Enter Area"
                value={data.area} name='area' onChange={handleChange}
              />
            </div>
          </div>

          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="subscribers">#Subscribers in the Total</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Subscribers"
                value={data.subscribers}
                name='subscribers'
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="avgCallsPerDay">Average Calls/Day/Subscriber </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Avg Calls Per Day"
                value={data.avgCallsPerDay}
                name='avgCallsPerDay'
                onChange={handleChange} />
            </div>
          </div>

          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="avgCallDuration">Average Call Duration(min) </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Avg Call Duration"
                value={data.avgCallDuration}
                name='avgCallDuration'
                onChange={handleChange}
              />
            </div>
            <div className='selct' style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="probability">Grade of Service (GOS):</label>
              <select id="probability" value={data.probability} name='probability' onChange={handleChange}>
                <option value="">Select GOS</option>
                <option value="0.1">0.1%</option>
                <option value="0.2">0.2%</option>
                <option value="0.5">0.5%</option>
                <option value="1">1%</option>
                <option value="1.2">1.2%</option>
                <option value="1.3">1.3%</option>
                <option value="1.5">1.5%</option>
                <option value="2">2%</option>
                <option value="3">3%</option>
                <option value="5">5%</option>
                <option value="7">7%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="30">30%</option>
              </select>
            </div>

          </div>

          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="SIR">SIR in dB:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter SIR"
                value={data.SIR}
                name='SIR'
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="refDistance">Reference Distance (meters) </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Ref Distance"
                value={data.refDistance}
                name='refDistance'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="refPower">Ref.power at Ref.distance(dB)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Ref Power"
                value={data.refPower}
                name='refPower'
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="pathLossExponent">Path Loss Exponent</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Path Loss Exponent"
                value={data.pathLossExponent}
                name='pathLossExponent'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='in' style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="receiverSensitivity">Receiver sensitivity (μW)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Receiver Sensitivity"
                value={data.receiverSensitivity}
                name='receiverSensitivity'
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="numberOfCoChannels">#co-channel interfering cells:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Number Of Co-Channels"
                value={data.numberOfCoChannels}
                name='numberOfCoChannels'
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary wid" >Calculate</button>
          <div>
            {results.maximumDistance &&
              <div className="result size2">
                <h3>Results</h3>
                <ul>
                  <p>Max distance: {results.maximumDistance} meters ,
                    Max cell size: {results.formattedCellSize} sq meters ,
                    Cells in service area: {results.numberOfCellsInServiceArea} ,
                    Total traffic: {results.wholeTraffic} Erlangs ,
                    Traffic per cell: {results.trafficPerCell} Erlangs/cell ,
                    Cells per cluster: {results.Number_of_cell} ,
                    Min channels per cell: {results.numberOfChannels} ,
                    Min carriers per cell: {results.numberofCarrier}
                  </p>
                </ul>
              </div>
            }
          </div>
        </form>

      </div>
      <div className='Right padding'>
        <img src={PIC} alt="Wireless Penetration Test" />
      </div>
    </div>
  )
}

export default Cellular_System
