import styles from './styles.module.css';
import {useEffect} from "react";
import {dataTest} from "../../App";


const compareLog = (i, task) => `%0A Задание ${i} - ${task.name}:%0A` + task.logs.join("%0A")



export default function End() {

    useEffect(() => {
        const text = Object.entries(dataTest.user).map(([key, value]) => `${key}: ${value}%0A`).join('') +
            compareLog(1, dataTest.shulteNumbers) +
            compareLog(2, dataTest.shulteRandomNumbers) +
            compareLog(3, dataTest.shulteRandomChar) +
            compareLog(4, dataTest.shulteRandomWords) ;


        fetch(`https://api.telegram.org/bot6065223645:AAEDyBXBoUZkYnAVk_rCrRr4QJm6ES22T-c/sendMessage?chat_id=897336974&text=${text}&parse_mode=html`)
    }, [])

    return (<div>
        <p className={styles.heading}>Cпасибо за уделенное время</p>
    </div>)
}