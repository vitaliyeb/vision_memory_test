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

    useEffect(() => {
        if(!isVisibleBanner) {
            logs.push(`Начало выполнения ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
            setCurrentDetected(dertyVariant.shift())
        }
    }, [isVisibleBanner])

    const handleClick = (item) => {        
        if (currentDetected === item) {
            const newTime = Date.now();
            logs.push(`Найдено ${item} спустя ${moment(newTime).diff(lastTime.current, 'second', true)} секунды`);
            lastTime.current = newTime;
            if (!dertyVariant.length) {
                logs.push(`Задание закончено за ${moment(Date.now()).diff(startTime.current, 'second', true)} секунд`);
                return next();
            }
            setDetected(prevState => [...prevState, item]);
            setCurrentDetected(dertyVariant.shift());
        } else {
            logs.push(`Ошибка ${currentDetected} != ${item}`);
        }
    }
    // console.log(variants, initialVariants);
    
    if(isVisibleBanner) {
        return <Banner text={banner} next={() => setIsVisibleBanner(false)}/>
    }


    return (<div>
        <div className={styles.heading}>
            <p>{heading}</p>
            <div>
                { 
                    variants.map((variant) => <div
                        key={variant}
                        style={isColor ? { backgroundColor: variant, width: '25px', height: '25px', display: 'inline-block'} : {}}
                    >
                        { isColor ? undefined : isImages ? <img src={variant} style={{ display: 'block', width: '45px', height: '45px', }}/> : variant }
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
                    key={item}
                    onClick={() => handleClick(item)}
                    className={detected.includes(item) ? styles.detected : ''}
                >
                    { isColor ? undefined  : isImages ? <img src={item} style={{ width: '100%', height: '100%', objectFit: 'contain'}} alt="" /> : item }
                </div>))
            }
        </div>
    </div>)
}