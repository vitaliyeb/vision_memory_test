import './App.css';
import Login from "./components/Login/Login";
import {createContext, useState} from "react";
import ShulteNum from "./components/ShulteNum/ShulteNum";
import Banner from "./components/Banner/Banner";
import ShulteMulti from "./components/ShulteMulti/ShulteMulti";
import End from "./components/End/End";


export const dataTest = {
    user: {
        "Имя": "Виталик",
        "Возраст": "22"
    },
    shulteNumbers: {
        name: 'Найди числа по порядку от 1 до 25',
        logs: []
    },
    shulteRandomNumbers: {
        name: "Найди рандомное число",
        logs: []
    },
    shulteRandomChar: {
        name: "Найди рандомную букву",
        logs: []
    },
    shulteRandomWords: {
        name: "Найди рандомное слово",
        logs: []
    }
};

const chars = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];
const words = ['АКТ', 'ЮЛА', 'СЫН', 'ШИП', 'ОСА', 'МАК', 'КОТ', 'САД', 'РОГ', 'МИР', 'ОПТ', 'НОЖ', 'МЕХ', 'КОМ', 'ИВА', 'ЗАЛ', 'ЖАР', 'ДУБ', 'НОС', 'БЕГ'];

const makeRandomArray = (initialArr) => {
    let arr = [...initialArr];
    return [...arr].map(() => {
        const index = Math.floor(Math.random() * arr.length);
        const item = arr[index]
        arr = arr.filter((n) => n !== item);
        return item;
    })
}

function App() {
    const [componentId, setComponentId] = useState(0);
    return (
        <div className="App">
            {componentId === 0 && <Login setComponentId={setComponentId}/>}
            {componentId === -1 && <Banner
                text="Сейчас вы увидите таблицу из чисел, расположенных в случайном порядке. Вам нужно будет найти числа в порядке возрастания, от 1 до 25. Сделайте это как можно быстрее и без ошибок."
                next={() => setComponentId(1)}
            />}
            {componentId === 1 && <ShulteNum setComponentId={setComponentId}/>}
            {componentId === -2 && <Banner
                text="Отлично! &#10; Сейчас вы увидите еще несколько таблиц из чисел, букв или слов. Ваша задача как можно быстрее найти число/букву/слово указанное в рамочке сверху, над таблицей. Давайте попробуем. "
                next={() => setComponentId(2)}
            />}
            {componentId === 2 && <ShulteMulti
                heading="Найдите число: "
                logs={dataTest.shulteRandomNumbers.logs}
                items={makeRandomArray(Array.from({length: 25}).map((_, i) => i + 1))}
                variants={makeRandomArray(Array.from({length: 25}).map((_, i) => i + 1)).slice(0, 11)}
                next={() => setComponentId(-3)}
            />}
            {componentId === -3 && <Banner
                text="Отлично!  "
                next={() => setComponentId(3)}
            />}
            {componentId === 3 && <ShulteMulti
                heading="Найдите букву: "
                logs={dataTest.shulteRandomChar.logs}
                items={makeRandomArray(chars)}
                variants={makeRandomArray(chars).slice(0, 11)}
                next={() => setComponentId(-4)}
            />}
            {componentId === -4 && <Banner
                text="Отлично!  "
                next={() => setComponentId(4)}
            />}
            {componentId === 4 && <ShulteMulti
                heading="Найдите слово: "
                logs={dataTest.shulteRandomWords.logs}
                items={makeRandomArray(words)}
                variants={makeRandomArray(words).slice(0, 11)}
                next={() => setComponentId(-5)}
            />}
            {
                componentId === -5 && <End/>
            }
            {/*<RenderComponent />*/}
            {/*{RenderComponent}*/}
            {/*<RenderComponent nextComponent={setRenderComponent}/>*/}
        </div>
    );
}

export default App;
