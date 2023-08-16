export function radomNumber() {
    const number = [ 1, 2, 3, 4, 5, 6, 7 ];
    const random = Math.floor(Math.random() * number.length);
    
    return number[random];
}