import classes from'./Widget.module.css'

export default function Widget({image, isActive, onClick}) {
    return (
        <div className={isActive ? `${classes.widget} ${classes.active_widget}` : `${classes.widget}`} onClick={onClick}>          
            <img src={image} alt="Widgets" />
        </div>
    )
}