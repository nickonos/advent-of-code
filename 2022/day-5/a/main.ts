import fs from "fs/promises"

main()

type Move = {
    Amount: number
    From: number
    To: number
}

async function main() {
    const input = await ReadJSON()
    const split = input.split("\r\n\r\n")
    const crates = formatCrates(split[0])
    const moves = formatMoves(split[1])
    console.log(crates)
    moves.map((moves) => {
        for (let i =0; i < moves.Amount && crates[moves.From-1].length > 0; i++){
            const crate = crates[moves.From-1].shift()
            
            if (crate){
                crates[moves.To-1].unshift(crate)
            }

        }
    })

    let str = ""
    crates.map((c) => {
        str += c[0]
    })
    console.log(crates)
    console.log(str)
}

function formatMoves(input: string): Move[] {
    const moves: Move[] = [];
    input.split("\r\n").map((str) => {
        const split = str.split(" ")
        moves.push({
            Amount: parseInt(split[1]),
            From: parseInt(split[3]),
            To: parseInt(split[5])
        })
    })

    return moves;
}

function formatCrates(input: string): string[][] {
    const crates: string[][] = []
    const split = input.split("\r\n")
    for(let y = 0; y < 9; y++){
        const row : string[] = []
        for (let i = 0; i < 8; i++){
            const crate = split[i][1 + (y*4)]
            if (crate && crate !== " ")
                row.push(crate)
        }
        crates.push(row)
    }
    
    return crates
}

async function ReadJSON() {
    return fs.readFile("./input.txt", 'utf-8')
}