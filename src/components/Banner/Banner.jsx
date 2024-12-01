import styles from './styles.module.css';

export default function Banner({text, next}) {

    return (<div>
        <p className={styles.heading} dangerouslySetInnerHTML={{__html: text}}>
        </p>
        <div onClick={next} className={styles.button}>Продолжить</div>
    </div>)
}