import React, { useState } from 'react'
import PIC from '../../assets/Internet-WiFi-Setup-Maintenance-02.png'
import './Signal.css'

export default function Signal() {
  const [data, setData] = useState({
    Bandwidth: '',
    QuantizerBits: '',
    EncoderCompressionRate: '',
    ChannelEncoderRate: ''
  })
  const [results, setResults] = useState({
    samplerRate: '',
    quantizerRate: '',
    sourceEncoderRate: '',
    channelEncoderRateBits: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleCalculate = (e) => {
    e.preventDefault();
    const bandwidthValue = parseFloat(data.Bandwidth);
    const quantizerBitsValue = parseInt(data.QuantizerBits, 10);
    const encoderCompressionRateValue = parseFloat(data.EncoderCompressionRate);
    const channelEncoderRateValue = parseFloat(data.ChannelEncoderRate);

 
    const samplerRate = bandwidthValue * 2; // Nyquist rate
    const quantizerRate = Math.pow(2, quantizerBitsValue);
    const sourceEncoderRate = samplerRate * quantizerBitsValue *encoderCompressionRateValue ;
    const channelEncoderRateBits  = sourceEncoderRate / channelEncoderRateValue ;

    setResults({
      samplerRate,
      quantizerRate,
      sourceEncoderRate,
      channelEncoderRateBits
    });
  };

  return (
    <div className='Hm '>
      <div className={`Left padding-left ${results.samplerRate ? 'pad' : ''}`}>
        <h2>Signal Processing</h2>

        <form onSubmit={handleCalculate}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Bandwidth (Hz)</label>
            <input type="text" className="form-control" placeholder="Enter Bandwidth" value={data.Bandwidth} name='Bandwidth' onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Quantizer Bits</label>
            <input type="text" className="form-control" placeholder="Enter number of Quantizer Bits" value={data.QuantizerBits} name='QuantizerBits' onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Encoder Compression Rate</label>
            <input type="text" className="form-control" placeholder="Enter Compression Rate" value={data.EncoderCompressionRate} name='EncoderCompressionRate' onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Channel Encoder Rate</label>
            <input type="text" className="form-control" placeholder="Enter Encoder Rate" value={data.ChannelEncoderRate} name='ChannelEncoderRate' onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" >Calculate</button>
          <div>
            {results.samplerRate &&
              <div className="result">
                <h3>Results</h3>
                <ul>
                  <p>
                    Sampler Rate: {results.samplerRate} ,
                    Quantizer Rate: {results.quantizerRate}
                  </p>
                  <p>
                    Source Rate: {results.sourceEncoderRate} ,<br />
                    Channel Rate (Bits): {results.channelEncoderRateBits}
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
