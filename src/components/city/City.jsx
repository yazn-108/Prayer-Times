import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { cities } from './cities';
const City = ({ setCityName }) => {
    City.propTypes = {
        setCityName: PropTypes.any,
    };
    const select = useRef()
    const open = () => select.current.classList.toggle("open")
    const [selectName, setSelectName] = useState(localStorage.getItem("cityAR") || "اختر مدينة")
    const handleChange = (value, ele) => {
        select.current.querySelectorAll("p").forEach(e => e.classList.remove("selected"));
        ele.target.classList.add("selected")
        setSelectName(value.ar)
        localStorage.setItem("cityAR", value.ar)
        localStorage.setItem("cityEN", value.en)
        open()
        setCityName({
            en: value.en,
            ar: value.ar,
        })
    };
    return (
        <div className='select'>
            <div className='selectName' onClick={open}>{selectName}</div>
            <div className='selectList' ref={select}>
                {cities.map((city, i) => <p key={i} onClick={(e) => handleChange({ en: city.value, ar: city.name }, e)}>{city.name}</p>)}
            </div>
        </div>
    );
};
export default City;
