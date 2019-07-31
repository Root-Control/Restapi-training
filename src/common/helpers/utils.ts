import { EnvironmentService } from '../../environment.variables';

/**
 * Defines if the provided parameter is an empty object {} or not
 */
function isEmptyObject(value) {
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function getMethodColor(method) {
    let color;
    switch (method) {
        case 'POST':
            color = 'yellow';
            break;
        case 'GET':
            color = 'green';
            break;
        case 'PUT':
            color = 'blue';
            break;
        case 'PATCH':
            color = 'gray';
            break;
        case 'DEL':
            color = 'red';
            break;
    }
    return color;
}

function getAllowedDatabases() {
    const environment = new EnvironmentService('.env');
    const allowedDbs = environment.get('DBS').split(',');
    return allowedDbs;
}

const getOrigin = url => {
    if (url) {
        const newURL = new URL(url);
        return newURL.host;
    } else {
        return null;
    }
};

const getDatabaseFromOrigin = url => {
    const origin = getOrigin(url);
    if (origin) {
        const subdomainDB = origin.split('.')[0].toUpperCase();
        const allowedDbs = getAllowedDatabases();
        const isValidSubdomain = allowedDbs.includes(subdomainDB);

        if (isValidSubdomain) {
            return subdomainDB;
        } else {
            return 'DATABASE1';
        }
        return subdomainDB;
    } else {
        return 'DATABASE1';
    }
};

export {
    isEmptyObject,
    getMethodColor,
    getOrigin,
    getDatabaseFromOrigin
};
