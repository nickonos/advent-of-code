import fs from "fs/promises"

main()

async function main() {
    const input = await ReadFile()
    for (let i= 0; i < input.length; i++) {
        if (checkForMessage(i, input))
            return
    }
}

function checkForMessage(index: number, str: string){
    const characters: string[] = [];
    for (let y =0; y < 14; y++){
        if (characters.includes(str[index+y])){
            return false
        }
        characters.push(str[index+y])
    }
    console.log(index + 14)
    return true
}

async function ReadFile() {
    return fs.readFile("./input.txt", 'utf-8')
}