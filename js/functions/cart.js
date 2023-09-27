export function save(key , value) {
    const encodedValue = JSON.stringify(value);
    localStorage.setItem(key , encodedValue);
}

export function load(key) {
    const encodedValue = localStorage.getItem(key);
    return JSON.parse(encodedValue);
}

export function remove(key) {
    localStorage.removeItem(key);
}

