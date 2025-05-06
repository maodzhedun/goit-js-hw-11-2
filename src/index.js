
import { getData } from './js/template/api';

getData('cat').then((respons) => {
    console.log(respons)
})
.then((data) => console.log(data)).catch((err) => {
    console.log('Ошибка при получении данных:', err)
});