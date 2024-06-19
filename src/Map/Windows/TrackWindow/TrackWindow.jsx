import { useState } from 'react';
import '../Window.css'
import plus from './img/plus.svg';
import winter from './img/winter.svg';
import autumn from './img/autumn.svg';
import summer from './img/summer.svg';
import spring from './img/spring.svg';
import bike from './img/bike.svg';
import car from './img/car.svg';
import foot from './img/foot.svg';
import classes from './TrackWindow.module.css'
import { ResetTrackParams, useTrackParamsContext } from '../../../../CustomHooks/TrackParamsContext';
import { useWidgetsStatusContext } from '../../../../CustomHooks/WidgetsStatusContext';
import { UploadTracksData, useTracksListContext } from '../../../../CustomHooks/TracksListContext';

export default function TrackWindow() {
    const [nameValue, setNameValue] = useState("")
    const [authorValue, setAuthorValue] = useState("")
    const [timeValue, setTimeValue] = useState("00:00")

    const { creationTrackParams, setCreationTrackParams } = useTrackParamsContext();
    const { setWidgetStatus } = useWidgetsStatusContext();
    const { setTracksList } = useTracksListContext();

    const handleChangeMode = (newMode) => {
        setCreationTrackParams((prev) => ({
            ...prev,
            mode: newMode,
          }))
    }

    const handleChangeStatusOfWidget = (widget) => {
        setWidgetStatus(prevState => ({
            ...prevState,
            [widget]: !prevState[widget]
        }));
    }

    const handleChangeName = (e) => {
        setNameValue(e.target.value);
    }

    const handleChangeSeason = (newSeason) => {
        setCreationTrackParams((prev) => ({
            ...prev,
            season: newSeason,
          }))
    }

    const handleChangeTransport = (newTransport) => {
        setCreationTrackParams((prev) => ({
            ...prev,
            transport: newTransport,
          }))
    }

    const handleChangeAuthor = (e) => {
        setAuthorValue(e.target.value);
    }

    const handleChangeTime = (e) => {
        setTimeValue(e.target.value);
    };

    const handleSave = async () => {
        await sendTrack();
        UploadTracksData(setTracksList);
        handleDelete();
    };

    const colorType = {
        0: "#2172D4",
        1: "#ffe100",
        2: "#47ba00",
        3: "#fca800"
    }

    // async function sendPhoto(id) {
    //     const data = new FormData();
    //     if (files.length > 0) 
    //     {
    //         files.forEach((file) => {
    //             data.append("file", file, `${id}.jpg`);
    //           });
      
    //           await fetch('https://localhost:7263/api/Image/UploadFile', { method: "POST", body: data })
    //             .then((response) => response.json())
    //             .then(() => setFiles([]))
    //             .catch(() => setFiles([]));
    //     }
    // };

    async function sendTrack() {

        let time2 = timeValue.split(":")
        let timeNumbers = time2.map(numStr => parseInt(numStr))
        

        let json = {"cordinates": creationTrackParams.track.map(cords => ({"cords": cords})),
                    "checkpoints": creationTrackParams.checkpoints,
                    "season": creationTrackParams.season,
                    "transport": creationTrackParams.transport,
                    "length": creationTrackParams.distance,
                    "color": colorType[creationTrackParams.season]
                    };
        if (nameValue.length > 0) {
            json["name"] = nameValue;
        }
        if (authorValue.length > 0) {
            json["author"] = authorValue;
        }
        if (timeNumbers[0]*60 + timeNumbers[1] !== 0) {
            json["time"] = timeNumbers[0]*60 + timeNumbers[1];
        }
    
        await fetch('https://arseniy1206-terrabackend-aad7.twc1.net/api/Ways', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
           body: JSON.stringify(json)
        });
    }

    const handleDelete = () => {
        handleChangeStatusOfWidget("trackWidget");
        setNameValue("")
        setAuthorValue("")
        setTimeValue("00:00")
        ResetTrackParams(setCreationTrackParams);
    }

    return (
        <div className="creationWindow">
            <h1>Создание нового трека</h1>

            <div className={`${classes.mode}`}>
                <label>Режим построения:</label>
                <ul className={`${classes.modeList}`}>
                    <li className={`${classes.modeItem}`}>
                        <button 
                                className={`${classes.button}`}
                                disabled={creationTrackParams.mode === 0 ? true : false}
                                onClick={() => handleChangeMode(0)}
                                >Автоматический</button>
                    </li>

                    <li className={`${classes.modeItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                disabled={creationTrackParams.mode === 1 ? true : false}
                                onClick={() => handleChangeMode(1)}
                                >Ручной</button>
                    </li>
                </ul>
            </div>

            <div className={`${classes.addMarker}`}>
                <button 
                        className={`${classes.button}`} 
                        onClick={() => handleChangeStatusOfWidget("markerWidget")}
                        >
                            <p>Добавить чек-поинт</p>
                            <img src={plus} alt="plus" />
                </button>
            </div>

            <div className={`${classes.name}`}>
                <label>Введите название:</label>
                <input type="text" className={`${classes.textInput}`} value={nameValue} onChange={handleChangeName} autoComplete="name"/>
            </div>

            <div className={`${classes.season}`}>
                <label>Выберите сезон:</label>
                <ul className={`${classes.seasonList}`}>
                    <li className={`${classes.seasonItem}`}>
                        <button 
                                className={`${classes.button}`}
                                disabled={creationTrackParams.season === 0 ? true : false}
                                onClick={() => handleChangeSeason(0)}
                                >
                                    <img src={winter} alt="winter"/>
                        </button>
                    </li>

                    <li className={`${classes.seasonItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                disabled={creationTrackParams.season === 1 ? true : false}
                                onClick={() => handleChangeSeason(1)}
                                >
                                <img src={autumn} alt="autumn"/>
                        </button>
                    </li>

                    <li className={`${classes.seasonItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                disabled={creationTrackParams.season === 2 ? true : false}
                                onClick={() => handleChangeSeason(2)}
                                >
                                    <img src={summer} alt="summer"/>
                        </button>
                    </li>

                    <li className={`${classes.seasonItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                disabled={creationTrackParams.season === 3 ? true : false}
                                onClick={() => handleChangeSeason(3)}
                                >
                                    <img src={spring} alt="spring"/>
                        </button>
                    </li>
                </ul>
            </div>

            <div className={`${classes.transport}`}>
                <label>Выберите транспорт:</label>
                <ul className={`${classes.transportList}`}>
                    <li className={`${classes.transportItem}`}>
                        <button 
                                className={`${classes.button}`}
                                disabled={creationTrackParams.transport === 0 ? true : false}
                                onClick={() => handleChangeTransport(0)}
                                >
                                    <img src={bike} alt="bike"/>
                        </button>
                    </li>

                    <li className={`${classes.transportItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                disabled={creationTrackParams.transport === 1 ? true : false}
                                onClick={() => handleChangeTransport(1)}
                                >
                                <img src={car} alt="car"/>
                        </button>
                    </li>

                    <li className={`${classes.transportItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                disabled={creationTrackParams.transport === 2 ? true : false}
                                onClick={() => handleChangeTransport(2)}
                                >
                                    <img src={foot} alt="foot"/>
                        </button>
                    </li>
                </ul>
            </div>

            <div className={`${classes.time}`}>
                    <label>Введите время в пути:</label>
                    <input 
                            type="time" 
                            className={`${classes.timeInput}`} 
                            value={timeValue}
                            onChange={handleChangeTime}
                    />
            </div>

            <div className={`${classes.author}`}>
                <label>Введите авторство:</label>
                <input type="text" className={`${classes.textInput}`} value={authorValue} onChange={handleChangeAuthor} autoComplete="nickname"></input>
            </div>

            <div className={`${classes.distance}`}>
                <label>Расстояние маршрута: {Math.floor(creationTrackParams.distance/1000)} км</label>
            </div>

            <div className={`${classes.controlButtons}`}>
                <ul className={`${classes.controlButtonsList}`}>
                    <li className={`${classes.controlButtonsItem}`}>
                        <button 
                                className={`${classes.button}`}
                                // disabled={modeBuilding === 0 ? true : false}
                                onClick={handleSave}
                                >Сохранить трек</button>
                    </li>

                    <li className={`${classes.controlButtonsItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                // disabled={modeBuilding === 1 ? true : false}
                                onClick={handleDelete}
                                >Удалить трек</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}