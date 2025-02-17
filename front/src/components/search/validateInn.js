export function validateInn(inn) {
    // Проверяем, что входные данные — строка или число
    if (typeof inn === 'number') {
        inn = inn.toString();
    } else if (typeof inn !== 'string') {
        return false;
    }

    // Проверяем, что длина ИНН равна 10 и состоит только из цифр
    if (inn.length !== 10 || /[^0-9]/.test(inn)) {
        return false;
    }

    // Функция для вычисления контрольной цифры
    const checkDigit = (inn, coefficients) => {
        let n = 0;
        for (let i in coefficients) {
            n += coefficients[i] * parseInt(inn[i]);
        }
        return parseInt(n % 11 % 10);
    };

    // Проверка контрольной цифры для 10-значного ИНН
    const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
    return n10 === parseInt(inn[9]);
}