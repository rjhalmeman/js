function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    if (num === 2) {
        return true;
    }
    let i = 2;
    while (i < num) {
        if (num % i === 0) {
            return false;
        }
        i++;
    }
    return true;
}