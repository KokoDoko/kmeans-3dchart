//
// fake data
//
export function createFakeData() {
    let data = []
    for (let i = 0; i < 40; i++) {
        data.push([Math.random() * 40 + 40, Math.random() * 30, Math.random() * 50])
    }
    for (let j = 0; j < 40; j++) {
        data.push([Math.random() * 40, Math.random() * 40 + 30, Math.random() * 30])
    }
    for (let k = 0; k < 40; k++) {
        data.push([Math.random() * 40, Math.random() * 40, Math.random() * 30 + 40])
    }
    for (let l = 0; l < 70; l++) {
        data.push([Math.random() * 100, Math.random() * 100, Math.random() * 100])
    }
    return data

    /*
    // just some points
    let data = [
        [90, 3, 30],
        [30, 100, 2],
        [100, 2, 30],
        [1, 95, 30],
        [28, 95, 6],
        [10, 100, 1],
        [20, 1, 30],
        [30, 88, 3],
        [2, 27, 88],
        [3, 26, 81]
    ]
    */
}

