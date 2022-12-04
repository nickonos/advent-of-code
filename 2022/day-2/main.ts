import fs from "fs/promises"

main()

const points: {[key: string]: number} = {
    X: 1,
    Y: 2,
    Z: 3,
}

const winsFrom: {[key: string]: string} = {
    C: "X",
    A: "Y",
    B: "Z"
}

const drawsTo: {[key: string]: string} = {
    A: "X",
    B: "Y",
    C: "Z"
}

const losesTo: {[key: string]: string} = {
    B: "X",
    C: "Y",
    A: "Z"
}

async function main() {
    const input: string[][] = await ReadJSON()

    let total_points = 0;
    input.map((value) => {
        if (value[1] === "X")
            total_points += points[losesTo[value[0]]]
        
        if (value[1] === "Y")
            total_points += points[drawsTo[value[0]]] + 3
        
        if (value[1] === "Z")
            total_points += points[winsFrom[value[0]]] + 6
        
    })

    console.log(total_points)
}

async function ReadJSON() {
    return fs.readFile("./input.json", 'utf-8')
        .then((res) => JSON.parse(res))
}