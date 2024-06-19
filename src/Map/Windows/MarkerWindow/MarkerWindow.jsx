import '../Window.css'
import classes from './MarkerWindow.module.css'
import note from './img/note.svg';
import sight from './img/sight.svg';
import danger from './img/danger.svg';
import shelter from './img/shelter.svg';
import { ResetMarkerParams, useMarkerParamsContext } from '../../../../CustomHooks/MarkerParamsContext';
import { useWidgetsStatusContext } from '../../../../CustomHooks/WidgetsStatusContext';
import { useState } from 'react';
import { useTrackParamsContext } from '../../../../CustomHooks/TrackParamsContext';

export default function MarkerWindow() {
    const { creationMarkerParams, setCreationMarkerParams } = useMarkerParamsContext();
    const { creationTrackParams, setCreationTrackParams } = useTrackParamsContext();
    const { setWidgetStatus } = useWidgetsStatusContext();
    const [dragActive, setDragActive] = useState(false)

    const handleChangeStatusOfWidget = (widget) => {
        setWidgetStatus(prevState => ({
            ...prevState,
            [widget]: !prevState[widget]
        }));
    }

    const handleAddMarker = (newMarker) => {
        setCreationTrackParams((prev) => ({
            ...prev,
            checkpoints: [...creationTrackParams.checkpoints, newMarker],
          }))
    }

    function getChecpoint() {
        let json = {"x": creationMarkerParams.position[0], 
                    "y": creationMarkerParams.position[1], 
                    "type": creationMarkerParams.type,
                    "name": creationMarkerParams.name,
                    "description": creationMarkerParams.description,
                    "photos": creationMarkerParams.photo}

        return json;
    };

    const handleSave = () => {
        let marker = getChecpoint();
        handleAddMarker(marker);
        ResetMarkerParams(setCreationMarkerParams);
        handleChangeStatusOfWidget("markerWidget");
    };

    const handleDelete = () => {
        ResetMarkerParams(setCreationMarkerParams);
        handleChangeStatusOfWidget("markerWidget");
    };

    const setFiles = (newFile) => {
        setCreationMarkerParams((prev) => ({
            ...prev,
            photo: newFile,
          }))
    }

    const handleChangeName = (e) => {
        setCreationMarkerParams((prev) => ({
            ...prev,
            name: e.target.value,
          }))
    }

    const handleChangeDescription = (e) => {
        setCreationMarkerParams((prev) => ({
            ...prev,
            description: e.target.value,
          }))
    }

    const handleChangeType = (newType) => {
        setCreationMarkerParams((prev) => ({
            ...prev,
            type: newType,
          }))
    }

    const handleDrag = (e) => {
        e.preventDefault();
        setDragActive(true);
    }

    const handleLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    }

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
          setFiles([...e.target.files]);
        }
    };

    const handleReset = () => {
        setFiles([]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFiles([...e.dataTransfer.files]);
          }
    }

    function getChecpoint(latlng) {
        let json = {"x": creationMarkerParams.position[0], 
                    "y": creationMarkerParams.position[1], 
                    "type": creationMarkerParams.type,
                    "name": creationMarkerParams.name,
                    "description": creationMarkerParams.description}

        return json;
    };

    return (
        <div className="creationWindow">
            <h1>Добавление чекпоинта</h1>

            <div className={`${classes.name}`}>
                <label>Введите название:</label>
                <input type="text" className={`${classes.textInput}`} value={creationMarkerParams.name} onChange={handleChangeName} autoComplete="name"/>
            </div>

            <div className={`${classes.description}`}>
                <label>Описание точки:</label>
                <textarea className={`${classes.descriptionInput}`} value={creationMarkerParams.description} onChange={handleChangeDescription} />
            </div>

            <div className={`${classes.type}`}>
                <label>Выберите тип точки:</label>
                <ul className={`${classes.typeList}`}>
                    <li className={`${classes.typeItem}`}>
                        <button 
                                className={`${classes.button}`}
                                disabled={creationMarkerParams.type === 0 ? true : false}
                                onClick={() => handleChangeType(0)}
                                >
                                    <img src={note} alt="winter"/>
                        </button>
                    </li>

                    <li className={`${classes.typeItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                disabled={creationMarkerParams.type === 1 ? true : false}
                                onClick={() => handleChangeType(1)}
                                >
                                <img src={sight} alt="autumn"/>
                        </button>
                    </li>

                    <li className={`${classes.typeItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                disabled={creationMarkerParams.type === 2 ? true : false}
                                onClick={() => handleChangeType(2)}
                                >
                                    <img src={danger} alt="summer"/>
                        </button>
                    </li>

                    <li className={`${classes.typeItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                disabled={creationMarkerParams.type === 3 ? true : false}
                                onClick={() => handleChangeType(3)}
                                >
                                    <img src={shelter} alt="spring"/>
                        </button>
                    </li>
                </ul>
            </div>

            <div className={classes.wrapper}>
                <label>Загрузите фотографии:</label>
                <form className={`${classes.form} ${dragActive ? classes.drag : ""}`} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleLeave} onDrop={handleDrop}>
                    <h2>Перетащи файлы сюда</h2>
                    <p>или</p>
                    <label className={classes.label}>
                        <span>Загрузите файлы</span>
                        <input type="file" className={classes.photoInput} multiple={false} onChange={handleChange}/>
                    </label>

                    {creationMarkerParams.photo.length > 0 && (
                        <>
                            <ul className={classes.fileList}>
                                {creationMarkerParams.photo.map(({ name }, id) => (
                                    <li key={id}>{name}</li>
                                ))}
                            </ul>
                            <button className={classes.buttonReset} type="reset" onClick={handleReset}>Удалить файлы</button>
                        </>
                    )}
                </form>
            </div>

            <div className={`${classes.controlButtons}`}>
                <ul className={`${classes.controlButtonsList}`}>
                    <li className={`${classes.controlButtonsItem}`}>
                        <button 
                                className={`${classes.button}`}
                                disabled={creationMarkerParams.position.length === 0 ? true : false}
                                onClick={handleSave}
                                >Сохранить точку</button>
                    </li>

                    <li className={`${classes.controlButtonsItem}`}>
                        <button 
                                className={`${classes.button}`} 
                                // disabled={modeBuilding === 1 ? true : false}
                                onClick={handleDelete}
                                >Вернуться</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}