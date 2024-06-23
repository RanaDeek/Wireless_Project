import React, { useState } from 'react'
import PIC from '../../assets/Internet-WiFi-Setup-Maintenance-02.png'
import './Resource.css'
function Resource() {
    const [data, setData] = useState({
        Bandwidth: '',
        Subcarrier: '',
        OFDM_Symbols: '',
        Duration_of_Resource_Block: '',
        Bit_per_Resource: ''
    })
    const [results, setResults] = useState({
        numSubcarriers: '',
        resourceElementBits: '',
        ofdmSymbolBits: '',
        resourceBlockBits: '',
        resourceBlockRate: '',
        maxTransmissionRate: ''
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
        const subcarrierSpacingValue = parseFloat(data.Subcarrier);
        const ofdmSymbolsValue = parseInt(data.OFDM_Symbols, 10);
        const resourceBlockDurationValue = parseFloat(data.Duration_of_Resource_Block);
        const bitsPerResourceElementValue = parseInt(data.Bit_per_Resource, 10);

        const numSubcarriers = Math.floor(bandwidthValue / subcarrierSpacingValue);
        const resourceElementBits = Math.log2(bitsPerResourceElementValue);
        const ofdmSymbolBits = numSubcarriers * resourceElementBits;
        const resourceBlockBits = ofdmSymbolsValue * ofdmSymbolBits;
        const resourceBlockRate = resourceBlockBits / resourceBlockDurationValue / 1000000;
        const maxTransmissionRate = 4 * resourceBlockRate;

        setResults({
            numSubcarriers,
            resourceElementBits,
            ofdmSymbolBits,
            resourceBlockBits,
            resourceBlockRate,
            maxTransmissionRate
        });
    };


    return (
        <div className='Hm'>
            <div className={`Left padding-left ${results.numSubcarriers ? 'pad2' : 'pad4'}`}>
                <h2>Resource Allocation</h2>

                <form onSubmit={handleCalculate}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Bandwidth (Hz)</label>
                        <input type="text" className="form-control" placeholder="Enter Bandwidth" value={data.Bandwidth} name='Bandwidth' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Subcarrier Spacing (Hz)</label>
                        <input type="text" className="form-control" placeholder="Enter Subcarrier Spacing" value={data.Subcarrier} name='Subcarrier' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Number of OFDM Symbols in Resource</label>
                        <input type="text" className="form-control" placeholder="Enter Number of OFDM Symbols in Resource Block" value={data.OFDM_Symbols} name='OFDM_Symbols' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Duration of Resource Block (s)</label>
                        <input type="text" className="form-control" placeholder="Enter Duration of Resource Block" value={data.Duration_of_Resource_Block} name='Duration_of_Resource_Block' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Bits per Resource Element</label>
                        <input type="text" className="form-control" placeholder="Enter Bits per Resource Element" value={data.Bit_per_Resource} name='Bit_per_Resource' onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" >Calculate</button>
                    <div>
                        {results.numSubcarriers &&
                            <div className="result size">
                                <h3>Results</h3>
                                <ul>
                                    <p>
                                        Resource Element Bits : {results.resourceElementBits} ,
                                        OFDM Symbol Bits: {results.ofdmSymbolBits} ,
                                        Resource Block Bits: {results.resourceBlockBits} ,
                                        Resource Block Rate: {results.resourceBlockRate} Mhz,
                                        Max Transmission Rate : {results.maxTransmissionRate} Mhz (4 Parallel Resources)
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

export default Resource