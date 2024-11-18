import styles from './styles.module.css';
import {dataTest} from "../../App";


export default function Login ({setComponentId}) {


    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        const user = dataTest.user;
        user["Имя"] = formData.get("name");
        user["МКБ"] = formData.get("diagnosis");
        user["Возраст"] = formData.get("age");
        user["Класс"] = formData.get("сlass");
        setComponentId(1);
    }

    return (<div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                <label htmlFor="name">Имя (псевдоним)</label>
                <input id="name" name="name" required type="text"/>
            </div>
            <div>
                <label htmlFor="diagnosis">Наличие диагноза по МКБ (поставьте прочерк если это к Вам не относится)</label>
                <input id="diagnosis" name="diagnosis" required type="text"/>
            </div>
            <div>
                <label htmlFor="age">Возраст</label>
                <input id="age" name="age" required type="text"/>
            </div>
            <div>
                <label htmlFor="сlass">Класс</label>
                <input id="сlass" name="сlass" required type="text"/>
            </div>
            <button>Начать тестирование</button>
        </form>
        <p className={styles.notes}>МЫ ГАРАНТИРУЕМ СОБЛЮДЕНИЕ АНОНИМНОСТИ И КОНФИДЕНЦИАЛЬНОСТИ ВАШИХ ДАННЫХ</p>
    </div>)
}