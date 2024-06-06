import React, { ChangeEvent } from 'react';

interface SelectorProps {
    currency: string;
    currencies: string[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Selector: React.FC<SelectorProps> = ({ currency, currencies, onChange }) => {
    return (
        <select value={currency} onChange={onChange} className="currency-selector">
            {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                    {currency}
                </option>
            ))}
        </select>
    );
};

export default Selector;