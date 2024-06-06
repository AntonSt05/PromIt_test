import React, { useState, useEffect, ChangeEvent } from 'react';
import Selector from './Selector';
import { getExchangeRates } from '../services/api';
import '../App.scss';
import logo from '../assets/promit.svg';

interface ExchangeRates {
    [key: string]: number;
}

interface ConversionState {
    baseCurrency: string;
    targetCurrency: string;
    baseAmount: string;
    targetAmount: string;
    isCalculating: boolean;
    inputType: 'base' | 'target';
}

const Converter: React.FC = () => {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
    const [conversion, setConversion] = useState<ConversionState>({
        baseCurrency: 'USD',
        targetCurrency: 'RUB',
        baseAmount: '1',
        targetAmount: '',
        isCalculating: false,
        inputType: 'base',
    });

    useEffect(() => {
        const fetchCurrencies = async () => {
            const data = await getExchangeRates();
            setCurrencies(Object.keys(data.conversion_rates));
            setExchangeRates(data.conversion_rates);
            updateTargetAmount(conversion.baseAmount, data.conversion_rates[conversion.targetCurrency], data.conversion_rates[conversion.baseCurrency]);
        };

        fetchCurrencies();

        const interval = setInterval(fetchCurrencies, 3600000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (exchangeRates[conversion.targetCurrency] && exchangeRates[conversion.baseCurrency]) {
            if (conversion.inputType === 'base') {
                updateTargetAmount(conversion.baseAmount, exchangeRates[conversion.targetCurrency], exchangeRates[conversion.baseCurrency]);
            } else {
                updateBaseAmount(conversion.targetAmount, exchangeRates[conversion.baseCurrency], exchangeRates[conversion.targetCurrency]);
            }
        }
    }, [conversion.baseAmount, conversion.targetAmount, conversion.baseCurrency, conversion.targetCurrency, exchangeRates]);

    const updateTargetAmount = (amount: string, targetRate: number, baseRate: number) => {
        if (amount === '') {
            setConversion(prevState => ({
                ...prevState,
                targetAmount: '',
                isCalculating: false
            }));
        } else {
            setConversion(prevState => ({
                ...prevState,
                targetAmount: ((parseFloat(amount) * targetRate) / baseRate).toFixed(2),
                isCalculating: false
            }));
        }
    };

    const updateBaseAmount = (amount: string, baseRate: number, targetRate: number) => {
        if (amount === '') {
            setConversion(prevState => ({
                ...prevState,
                baseAmount: '',
                isCalculating: false
            }));
        } else {
            setConversion(prevState => ({
                ...prevState,
                baseAmount: ((parseFloat(amount) * baseRate) / targetRate).toFixed(2),
                isCalculating: false
            }));
        }
    };

    const handleAmountChange = (type: 'base' | 'target') => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setConversion(prevState => ({
            ...prevState,
            [`${type}Amount`]: value,
            isCalculating: true,
            inputType: type,
        }));
    };

    const handleCurrencyChange = (type: 'base' | 'target') => (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setConversion(prevState => ({
            ...prevState,
            [type === 'base' ? 'baseCurrency' : 'targetCurrency']: value,
            isCalculating: true
        }));
    };

    const swapCurrencies = () => {
        setConversion(prevState => ({
            ...prevState,
            baseCurrency: prevState.targetCurrency,
            targetCurrency: prevState.baseCurrency,
            baseAmount: prevState.targetAmount,
            targetAmount: prevState.baseAmount,
            isCalculating: true,
            inputType: prevState.inputType === 'base' ? 'target' : 'base',
        }));
    };

    useEffect(() => {
        if (exchangeRates[conversion.targetCurrency] && exchangeRates[conversion.baseCurrency]) {
            setConversion(prevState => ({ ...prevState, isCalculating: true }));
            if (conversion.inputType === 'base') {
                updateTargetAmount(conversion.baseAmount, exchangeRates[conversion.targetCurrency], exchangeRates[conversion.baseCurrency]);
            } else {
                updateBaseAmount(conversion.targetAmount, exchangeRates[conversion.baseCurrency], exchangeRates[conversion.targetCurrency]);
            }
        }
    }, [conversion.baseCurrency, conversion.targetCurrency]);

    return (
        <div className="converter-container">
            <img src={logo} alt="Company Logo" className="company-logo" />
            <h2>Конвертация валют</h2>
            <div className="converter-box">
                <div className="converter-title">
                    Конвертер валют по курсу ЦБ РФ
                </div>
                <div className="converter-form">
                    <div className="currency-input-container">
                        <input
                            type="number"
                            value={conversion.baseAmount}
                            onChange={handleAmountChange('base')}
                            className="currency-input"
                            placeholder="Сумма"
                        />
                        <div className="currency-selector-container">
                            <Selector
                                currency={conversion.baseCurrency}
                                currencies={currencies}
                                onChange={handleCurrencyChange('base')}
                            />
                        </div>
                    </div>
                    <button className="swap-button" onClick={swapCurrencies}>⇄</button>
                    <div className="currency-input-container">
                        <input
                            type="number"
                            value={conversion.targetAmount}
                            onChange={handleAmountChange('target')}
                            className="currency-input"
                            placeholder="Сумма"
                        />
                        <div className="currency-selector-container">
                            <Selector
                                currency={conversion.targetCurrency}
                                currencies={currencies}
                                onChange={handleCurrencyChange('target')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Converter;