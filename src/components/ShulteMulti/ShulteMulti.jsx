import styles from './styles.module.css';
import {useEffect, useRef, useState} from "react";
import moment from "moment/moment";

export default function ShulteMulti({ items, heading, variants, logs, next}) {
    const [currentDetected, setCurrentDetected] = useState('');
    const [detected, setDetected] = useState([]);
    const startTime = useRef(Date.now());
    const lastTime = useRef(startTime.current);

    useEffect(() => {
        logs.push(`Начало выполнения ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
        setCurrentDetected(variants.shift())
    }, [])

    const handleClick = (item) => {
        if (currentDetected === item) {
            const newTime = Date.now();
            logs.push(`Найдено ${item} спустя ${moment(newTime).diff(lastTime.current, 'second', true)} секунды`);
            lastTime.current = newTime;
            setDetected(prevState => [...prevState, item]);
            setCurrentDetected(variants.shift());
            if (!variants.length) {
                logs.push(`Задание закончено за ${moment(Date.now()).diff(startTime.current, 'second', true)} секунд`);
                next()
            }
        } else {
            logs.push(`Ошибка ${currentDetected} != ${item}`);
        }
    }
    console.log(logs)

    return (<div>
        <p className={styles.heading}>{heading} {currentDetected}</p>
        <div className={styles.table}>
            {
                items.map((item) => (<div
                    key={item}
                    onClick={() => handleClick(item)}
                    className={detected.includes(item) ? styles.detected : ''}
                >{ item }</div>))
            }
        </div>
    </div>)
}