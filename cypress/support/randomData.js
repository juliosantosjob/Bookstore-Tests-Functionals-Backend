export function randomNumber() {
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
}