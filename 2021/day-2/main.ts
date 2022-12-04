import fs from "fs/promises"

main()

async function main(){
    const movements = await ReadJSON()

    let depth = 0;
    let width = 0;
    let aim = 0;

    for(let i = 0; i < movements.length; i ++){
        let [direction, amount] = GetValues(movements[i])

        if (direction == "forward"){
            width += amount
            depth += (aim * amount)
        }
            
        if (direction == "down")
            aim += amount

        if (direction == "up")
            aim -= amount
    }

    console.log(depth * width)
}

async function ReadJSON() : Promise<string[]>{
    return fs.readFile("./input.json", 'utf-8')
    .then((res) =>  JSON.parse(res))
}

function GetValues(input: string) : [string, number] {
    const values = input.split(" ")
    
    const direction = values[0]

    const amount = parseInt(values[1])

    return [direction, amount]
}