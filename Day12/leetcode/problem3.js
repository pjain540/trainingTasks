var numWaterBottles = function (numBottles, numExchange) {
    let total = numBottles;   // total bottles drank
    let empty = numBottles;   // empty bottles we have

    while (empty >= numExchange) {
        let newBottles = Math.floor(empty / numExchange);

        total += newBottles;  // drink new bottles
        empty = newBottles + (empty % numExchange);
    }

    return total;
};