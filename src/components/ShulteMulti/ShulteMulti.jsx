import styles from './styles.module.css';
import {useEffect, useRef, useState} from "react";
import moment from "moment/moment";
import Banner from '../Banner/Banner';

export default function ShulteMulti({ items, heading, variants, logs, next, isColor, isImages, banner}) {
    const [dertyVariant] = useState([...variants]);
    const [currentDetected, setCurrentDetected] = useState('');
    const [detected, setDetected] = useState([]);
    const startTime = useRef(Date.now());
    const lastTime = useRef(startTime.current);
    const [isVisibleBanner, setIsVisibleBanner] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if(!isVisibleBanner) {
            logs.push(`Начало выполнения ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
            setCurrentDetected(dertyVariant.shift())
        }
    }, [isVisibleBanner])

    const handleClick = (item) => {        
        if (currentDetected === item) {
            const newTime = Date.now();
            logs.push(`Найдено ${isImages ? item.name : item} спустя ${moment(newTime).diff(lastTime.current, 'second', true)} секунды`);
            lastTime.current = newTime;
            if (!dertyVariant.length) {
                logs.push(`Задание закончено за ${moment(Date.now()).diff(startTime.current, 'second', true)} секунд`);
                return next();
            }
            setDetected(prevState => [...prevState, item]);
            setCurrentDetected(dertyVariant.shift());
        } else {
            logs.push(`Ошибка ${isImages ? currentDetected.name : currentDetected} != ${isImages ? item.name : item}`);
            setIsError(item)
        }
    }
    
    useEffect(() => {
        if(isError) {
            setTimeout(() => {
                setIsError(false)
            }, 200);
          }
    }, [isError])

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
                        { isColor ? undefined : isImages ? <img src={variant.src} style={{ display: 'block', width: '45px', height: '45px', }}/> : variant }
                        {}
                    </div>)
                }
            </div>
        </div>
        <div className={styles.table}>
           

            {
                items.map((item) => (<div
                    style={{
                        backgroundColor: isColor ? item : undefined 
                    }}
                    key={isImages ? item.name : item}
                    onClick={() => handleClick(item)}
                    className={`${detected.includes(item) ? styles.detected : ''} ${isError === item ? styles.error : ''} ${styles.item}`}
                >
                    { isColor ? undefined  : isImages ? <img src={item.src} title={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain'}} alt="" /> : item }
                </div>))
            }
        </div>
    </div>)
}