export function validateInn(inn) {
    if (typeof inn === 'number') {
        inn = inn.toString();
    } else if (typeof inn !== 'string') {
        return false;
    }

    if (!inn.length || /[^0-9]/.test(inn) || [10, 12].indexOf(inn.length) === -1) {
        return false;
    }

    const checkDigit = (inn, coefficients) => {
        let n = 0;
        for (let i in coefficients) {
            n += coefficients[i] * inn[i];
        }
        return parseInt(n % 11 % 10);
    };

    switch (inn.length) {
        case 10:
            const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
            return n10 === parseInt(inn[9]);
        case 12:
            const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            return n11 === parseInt(inn[10]) && n12 === parseInt(inn[11]);
        default:
            return false;
    }
}