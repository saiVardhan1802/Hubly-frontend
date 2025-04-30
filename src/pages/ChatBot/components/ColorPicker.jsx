import React, { useEffect } from 'react';
import { useCustomization, useCustomizationDispatch, ACTIONS } from '../../../services/Context/ChatBotCustomization';
import styles from './styles/ColorPicker.module.css';

const ColorPicker = ({ title }) => {
    const customization = useCustomization();
    const dispatchCustomization = useCustomizationDispatch();

    const hexValue = isHeaderColor(title, customization);
    const valid = isValidHex(hexValue);

    function handleChange(e) {
        title === 'Header Color' ?
            dispatchCustomization({ type: ACTIONS.SET_HEADER_COLOR, payload: e.target.value.replace('#', '') })
            :
            dispatchCustomization({ type: ACTIONS.SET_BACKGROUND_COLOR, payload: e.target.value.replace('#', '') })
    }

    function handleClick(e) {
        const { id } = e.target;
        const button = document.getElementById(id);
        const selectedColor = rgbToHex(button.style.backgroundColor).replace('#', '');
        title === 'Header Color' ?
            dispatchCustomization({ type: ACTIONS.SET_HEADER_COLOR, payload: selectedColor })
            :
            dispatchCustomization({ type: ACTIONS.SET_BACKGROUND_COLOR, payload: selectedColor })
        const input = document.querySelector(`#colorInput${title === 'Header Color' ? 'Header' : 'Background'}}`);
        const inputValue = input.value.toLowerCase();
        const hexColorWithHash = `#${selectedColor}`.toLowerCase();
        if (inputValue === hexColorWithHash) {
            button.style.border = '1px solid black'
        }
        // console.log(customization);
    }

    useEffect(() => {
        const inputValue = isHeaderColor(title, customization).toLowerCase();
        const component = title==='Header Color' ? 'header' : 'background';
        [`${component}One`, `${component}Two`, `${component}Three`].forEach(id => {
            const button = document.getElementById(id);
            if (button) button.style.border = '1px solid #D4D4D4';
            const buttonColor = rgbToHex(button.style.backgroundColor).toLowerCase().replace('#', '');
            if (inputValue===buttonColor) {
                button.style.border = '1px solid black';
            }
            else {
                button.style.border = '';
            }
        })
    }, [title, customization])
    return (
        <div className={styles.container}>
            <h3>{title}</h3>
            <div className={styles.colors}>
                <button type='button' id={`${title==='Header Color' ? 'header' : 'background'}One`} style={{ backgroundColor: '#FFFFFF' }}
                    onClick={(e) => handleClick(e)}
                ></button>
                <button type='button' id={`${title==='Header Color' ? 'header' : 'background'}Two`} style={{ backgroundColor: '#000000' }} onClick={(e) => handleClick(e)}></button>
                <button type='button' id={`${title==='Header Color' ? 'header' : 'background'}Three`} style={{ backgroundColor: title==='Header Color' ? '#33475B' : '#EEEEEE' }}
                    onClick={(e) => handleClick(e)}
                ></button>
            </div>
            <div className={styles.colorInputContainer}>
            <div style={{ backgroundColor: valid ? `#${hexValue}` : (title==='Header Color' ? '#33475B' : '#EEEEEE') }}></div>
                <input type="text"
                    value={`#${title === 'Header Color' ? customization.headerColor : customization.backgroundColor}`}
                    onChange={(e) => handleChange(e)}
                    style={{
                        border: !isValidHex(title === 'Header Color' ? customization.headerColor : customization.backgroundColor)
                            ? '1px solid red'
                            : ''
                    }}
                    id={`colorInput${title === 'Header Color' ? 'Header' : 'Background'}`}
                />
            </div>
        </div>
    )
}

export default ColorPicker;

function isValidHex(color) {
    return /^[0-9A-Fa-f]{6}$/.test(color);
}

function isHeaderColor(title, customization) {
    return title === 'Header Color' ?
        customization.headerColor : customization.backgroundColor
}

const rgbToHex = (rgb) => {
    const result = rgb.match(/\d+/g);
    return "#" + result.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}
