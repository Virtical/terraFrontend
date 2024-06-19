import { useEffect, useState } from 'react';
import classes from './ParametersWindow.module.css'
import { useParametersContext } from '../../../../CustomHooks/ParametersContext';

export default function ParametersWindow(){
    const [lengthValue, setLengthValue] = useState("1")
    const { parameters, setParameters } = useParametersContext();

    const handleChangeLength = (e) => {
        setLengthValue(e.target.value);
    }

    const handleSave = () => {
        if (lengthValue === "11") {
            setParameters({})
        } else {
            setParameters({"length" : lengthValue})
        }
        
    };

    useEffect(() => {
        console.log(parameters);
    }, [parameters])

    return (
        <div className="parametersWindow">
            <h1>Категории маршрутов</h1>

            <div className={`${classes.length}`}>
                <label>Продолжительность маршрута:</label>
                    <input className={`${classes.lengthInput}`} type="range" min="1" max="11" step="1" value={lengthValue} onChange={handleChangeLength} list="custom-list"/>
                    <datalist className={`${classes.lengthDatalist}`} id="custom-list">
                        <option value="1" label="1 км"/>
                        <option value="2" label="2 км"/>
                        <option value="3" label="3 км"/>
                        <option value="4" label="4 км"/>
                        <option value="5" label="5 км"/>
                        <option value="6" label="6 км"/>
                        <option value="7" label="7 км"/>
                        <option value="8" label="8 км"/>
                        <option value="9" label="9 км"/>
                        <option value="10" label="10 км"/>
                        <option value="11" label="Все треки"/>
                    </datalist>
            </div>

            <div className={`${classes.controlButtons}`}>
                <ul className={`${classes.controlButtonsList}`}>
                    <li className={`${classes.controlButtonsItem}`}>
                        <button 
                                className={`${classes.button}`}
                                onClick={handleSave}
                                >Применить</button>
                    </li>

                    <li className={`${classes.controlButtonsItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                // onClick={handleDelete}
                                >Отмена</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}