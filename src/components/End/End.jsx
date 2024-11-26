import styles from './styles.module.css';
import {useEffect} from "react";
import {dataTest} from "../../App";
import { LOGS } from './../../App';

const compareLog = (i, task) => `%0A Задание ${i} - ${task.name}:%0A` + task.logs.join("%0A")



export default function End() {

    useEffect(() => {
        const text = Object.entries(dataTest.user).map(([key, value]) => `${key}: ${value}%0A`).join('') +
        LOGS.map((key, idx) => compareLog(idx, dataTest[key])).join(' ');
        
        fetch(`https://api.telegram.org/bot6065223645:AAEDyBXBoUZkYnAVk_rCrRr4QJm6ES22T-c/sendMessage?chat_id=1796053101&text=${text}&parse_mode=html`)
    }, [])

    return (<div>
        <p className={styles.heading}>Cпасибо за уделенное время !</p>
    </div>)
}