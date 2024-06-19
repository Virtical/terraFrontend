import magnifier from "./img/magnifier.svg"
import parameter from "./img/parameter.svg"

import classes from './FinderWindow.module.css'
import { useState } from "react";
import { useTracksListContext } from "../../../../CustomHooks/TracksListContext";
import { useMapRefContextContext } from "../../../../CustomHooks/MapRefContext";
import ParametersWindow from "../ParametersWindow/ParametersWindow";
import { useParametersContext } from "../../../../CustomHooks/ParametersContext";

export default function FinderWindow() {
    const [nameValue, setNameValue] = useState("");
    const [parametersButtonActive, setParametersButtonActive] = useState(true)
    const { tracksList } = useTracksListContext();
    const { mapRef } = useMapRefContextContext();
    const { parameters } = useParametersContext();

    const handleChangeName = (e) => {
        setNameValue(e.target.value);
    }

    const  findTrack = async () => {
        const findedTrack = tracksList.find(item => item.name === nameValue)
        if (findedTrack !== undefined) {
            const response = await fetch(`https://arseniy1206-terrabackend-aad7.twc1.net/api/Ways/${findedTrack.id}/midpoint`);
            const data = await response.json();
            let point = data['midpoint']
            const map = mapRef.current;
            map.flyTo([point[0], point[1]], data['zoom'])
        }
    }

    const handleChangeState = () => {
        setParametersButtonActive(prev => !prev);
    }

    return (
        <>
            <div className="finderBlock">
                <div className={`${classes.finderWindow}`}>
                    <input type="search" list="search keyword" placeholder="Search..." className={`${classes.searchBar}`} value={nameValue} onChange={handleChangeName}></input>
                    <button className={`${classes.findButton}`} onClick={findTrack}><img src={magnifier} alt="magnifier"/></button>
                    <datalist id="search keyword">
                        {tracksList.filter(track => parameters.length !== undefined ? Math.floor(track.length/1000) < parameters.length : track).map(track => <option key={Math.random().toString(16).slice(2)} value={`${track.name}`}/>)}
                    </datalist>
                </div>
                <button onClick={handleChangeState} className={parametersButtonActive ? `${classes.parametersButton}` : `${classes.parametersButton} ${classes.isActive}`} ><img src={parameter} alt="parameters"/></button>
            </div>
            {!parametersButtonActive ? <ParametersWindow/> : null}
        </>
    );
}