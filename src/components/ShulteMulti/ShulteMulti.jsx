import styles from './styles.module.css';
import {useEffect, useRef, useState} from "react";
import moment from "moment/moment";
import Banner from '../Banner/Banner';
import { LOGS } from './../../App';

export default function ShulteMulti({ items, heading, variants, logs, next, isColor, isImages, banner, logKey}) {
    const [dertyVariant] = useState([...variants]);
    const [currentDetected, setCurrentDetected] = useState('');
    const [detected, setDetected] = useState([]);
    const startTime = useRef(Date.now());
    const lastTime = useRef(startTime.current);
    const [isVisibleBanner, setIsVisibleBanner] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if(!isVisibleBanner) {
            logs.push(`Начало выполнения ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
            setCurrentDetected(dertyVariant.shift())
        }
    }, [isVisibleBanner])

    useEffect(() => {
        LOGS.push(logKey)
    }, [])

    const handleClick = (item) => {       
        if (currentDetected === item || (isColor && item.toString() === currentDetected.toString())) {
            const newTime = Date.now();
            logs.push(`Найдено ${isImages ? item.name : item} спустя ${moment(newTime).diff(lastTime.current, 'second', true)} секунды`);
            lastTime.current = newTime;
            if (!dertyVariant.length) {
                logs.push(`Задание закончено за ${moment(Date.now()).diff(startTime.current, 'second', true)} секунд`);
                return next();
            }
            setIsSuccess(item);
            setDetected(prevState => [...prevState, item]);
            setCurrentDetected(dertyVariant.shift());
        } else {
            logs.push(`Ошибка ${isImages ? currentDetected.name : currentDetected} != ${isImages ? item.name : item}`);
            setIsError(item)
        }
    }
    
    useEffect(() => {
        if(isError) {
            const errId = setTimeout(() => {
                setIsError(false)
            }, 2200);

            return () => clearTimeout(errId)
          }
    }, [isError])

    useEffect(() => {
        if(isSuccess) {
            const errId = setTimeout(() => {
                setIsSuccess(false)
            }, 2200);

            return () => clearTimeout(errId)
          }
    }, [isSuccess])

    if(isVisibleBanner) {
        return <Banner text={banner} next={() => setIsVisibleBanner(false)}/>
    }

    return (<div>
        <div className={styles.heading}>
            <p>{heading}</p>
            <div>
                { 
                    variants.map((variant) => <div
                        key={isImages ? variant.name : variant}
                        style={isColor ? { backgroundColor: variant, width: '25px', height: '25px', display: 'inline-block'} : {}}
                    >
                        { isColor ? 
                            <div className={styles.colorWrapper}>
                                <div style={{
                                    backgroundColor: variant[0],
                                    top: 0,
                                }}></div>
                                <div style={{
                                    backgroundColor: variant[1],
                                    top: '50%',
                                }}></div>
                            </div>
                         : isImages ? <img src={variant.src} style={{ display: 'block', width: '45px', height: '45px', }}/> : variant }
                        {}
                    </div>)
                }
            </div>
        </div>
        <div className={styles.table}>
           

            {
                items.map((item, idx) => (<div
                    key={isImages ? item.name : isColor ? idx : item}
                    onClick={() => handleClick(item)}
                    className={`${detected.includes(item) ? styles.detected : ''} ${isError === item ? styles.error : ''} ${isSuccess === item ? styles.success : undefined} ${styles.item}`}
               >
                    
                    { isColor ? 
                    <div className={styles.colorWrapper}>
                        <div style={{
                            backgroundColor: item[0],
                            top: 0,
                        }}></div>
                        <div style={{
                            backgroundColor: item[1],
                             top: '50%',
                        }}></div>
                    </div>  : isImages ? <img src={item.src} title={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain'}} alt="" /> : item }
                </div>))
            }
        </div>
    </div>)
}