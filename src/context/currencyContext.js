import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { currencyExchangeService } from '../services/apiServices/apiService';

const CurrencyAmount = createContext();

const CurrencyContext = (props) => {
  const [saRates, setsaRates] = useState(3.75);
  const [qarRate, setQarRate] = useState(3.641);
  const [aedRates, setAedRates] = useState(3.672034);

  // ********************************************************

  useEffect(() => {
    currencyExchangeService().then((e) => {
      if (e.data.success == true) {
        const SArate = e.data.rates['SAR'];
        const AEDrate = e.data.rates['AED'];
        const rateQr = e.data.rates['QAR'];
        setQarRate(rateQr);
        setsaRates(SArate);
        setAedRates(AEDrate);
      } else {
        return;
      }
    });
  }, []);

  // ********************************************************
  return <CurrencyAmount.Provider value={{ saRates, aedRates, qarRate }}>{props.children}</CurrencyAmount.Provider>;
};

export default CurrencyContext;
export { CurrencyAmount };
