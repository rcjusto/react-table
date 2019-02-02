export const TYPES = {
    STRING: 'string',
    SENTENCE: 'sentence',
    INTEGER: 'integer',
    DECIMAL: 'decimal'
};

const MIN_SIZES = {
    [TYPES.STRING]: 5,
    [TYPES.SENTENCE]: 20,
    [TYPES.INTEGER]: 1,
    [TYPES.DECIMAL]: 100
};

const MAX_SIZES = {
    [TYPES.STRING]: 10,
    [TYPES.SENTENCE]: 200,
    [TYPES.INTEGER]: 1000,
    [TYPES.DECIMAL]: 100000
};

const getColumnProperty = (config, colIndex, property, defValue) => {
    return config && config.columns && config.columns[colIndex] && config.columns[colIndex][property] ? config.columns[colIndex][property] : defValue;
};

const getRandomValue = (info) => {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const alphanumeric = "ABCDEF GHIJK LMNOPQR STUVW XYZabc defghi jklmnop qrstuv wxyz 01234 56789";
    const strLength = Math.random() * (info.maxSize - info.minSize) + info.minSize
    let strResult = '';

    switch (info.type) {
        case TYPES.STRING:
            for (let i = 0; i < Math.floor(strLength); i++) {
                strResult += alpha.charAt(Math.floor(Math.random() * alpha.length));
            }
            return strResult;
        case TYPES.SENTENCE:
            for (let i = 0; i < Math.floor(strLength); i++) {
                strResult += alphanumeric.charAt(Math.floor(Math.random() * alpha.length));
            }
            return strResult;
        case TYPES.INTEGER:
            return Math.floor(strLength);
        case TYPES.DECIMAL:
            return strLength;
    }
};

export const generateData = (config) => {

    const size = {
        columns: config && config.size && config.size.columns ? config.size.columns : 6,
        rows: config && config.size && config.size.rows ? config.size.rows : 100
    };

    const columns = [];
    for(let colIndex = 0; colIndex < size.columns; colIndex++) {
        const name = getColumnProperty(config, colIndex, 'name', 'Column ' + (colIndex + 1));
        const type = getColumnProperty(config, colIndex, 'type', TYPES.STRING);
        const minSize = getColumnProperty(config, colIndex, 'minSize', MIN_SIZES[type]);
        const maxSize = getColumnProperty(config, colIndex, 'maxSize', MAX_SIZES[type]);
        columns.push({
            key: 'column-' + (colIndex + 1),
            name,
            type,
            minSize,
            maxSize,
        })
    }

    const rows = [];
    for(let rowIndex = 0; rowIndex < size.rows; rowIndex++) {
        const row = {};
        columns.forEach(colInfo => {
            row[colInfo.key] = getRandomValue(colInfo)
        });
        rows.push(row);
    }

    return {columns, rows};
};