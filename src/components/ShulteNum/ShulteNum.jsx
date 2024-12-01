import styles from './styles.module.css';
import {useEffect, useMemo, useRef, useState} from "react";
import moment from "moment";
import {dataTest} from "../../App";
import Banner from '../Banner/Banner';

import { LOGS } from './../../App';

export default function ShulteNum({ setComponentId, banner }) {
    const task = dataTest.shulteNumbers;
    const [detected, setDetected] = useState([]);
    const startTime = useRef(Date.now());
    const lastTime = useRef(startTime.current);
    const [isVisibleBanner, setIsVisibleBanner] = useState(true);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        LOGS.push('shulteNumbers')
    }, []);

    useEffect(() => {
        if(!isVisibleBanner) {
            task.logs.push(`Начало выполнения ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
        }
    }, [isVisibleBanner])

    const randomInt = useMemo(() => {
        let numbers = Array.from({length: 25}).map((_, i) => i+1);
        return [...numbers].map(() => {
            const index = Math.floor(Math.random() * numbers.length);
            const num = numbers[index]
            numbers = numbers.filter((n) => n !== num);
            return num;
        })
    }, [])

    useEffect(() => {
        if (detected.length === 25) {
            task.logs.push(`Задание закончено за ${moment(Date.now()).diff(startTime.current, 'second', true)} секунд`);
            setComponentId(-2)
        }
    }, [detected])

    useEffect(() => {
        if(isError) {
            const errId = setTimeout(() => {
                setIsError(false)
            }, 2200);

            return () => clearTimeout(errId)
          }
      }, [isError])

    if(isVisibleBanner) {
        return <Banner text={banner} next={() => setIsVisibleBanner(false)}/>
    }


    const handleClick = (num) => {
        if (!detected.length) {
            if (num === 1) {
                setDetected(prevState => [...prevState, num])
                const newTime = Date.now();
                task.logs.push(`Выбрано число ${num} спустя ${moment(newTime).diff(lastTime.current, 'second', true)} секунды`);
                lastTime.current = newTime;
            } else  {
                task.logs.push(`Выбрано неверное число ${num}`);
                setIsError(num)
            }
        } else if(detected.at(-1) + 1 === num) {
            setDetected(prevState => [...prevState, num])
            const newTime = Date.now();
            task.logs.push(`Выбрано число ${num} спустя ${moment(newTime).diff(lastTime.current, 'second', true)} секунды`);
            lastTime.current = newTime;
        } else {
            task.logs.push(`Выбрано неверное число ${num}`);
            setIsError(num)
        }
    }



    return (<div>
        <p className={styles.heading}>Найди числа по порядку от 1 до 25</p>
        <div className={styles.table}>
            {
                randomInt.map((num) => (<div
                    key={num}
                    onClick={() => handleClick(num)}
                    className={`${detected.includes(num) ? styles.detected : ''} ${isError === num ? styles.error : ''} ${styles.item}`}
                >{ num }</div>))
            }
        </div>
    </div>)
}