import fs from "fs/promises"

main()

async function main() {
    const input = await ReadFile()
    for (let i= 0; i < input.length; i++) {
        if (
            input[i] != input [i+1] && 
            input[i] != input [i+2] && 
            input[i] != input [i+3] &&
            input[i+ 1] != input [i+2] &&
            input[i + 1] != input [i+3] &&
            input[i + 2] != input [i+3]
            ){
                console.log(input[i], input[i+ 1], input[i+ 2], input[i+ 3] )
                console.log(i+4)
                return
            } 
    }
}

async function ReadFile() {
    return fs.readFile("./input.txt", 'utf-8')
}