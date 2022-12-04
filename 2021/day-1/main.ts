import fs from "fs/promises"

main()

async function main(){
    const values = await ReadJSON()

    let last = 0;
    let total = 0;

    for(let i = 0; i < values.length; i++){
        let current = values[i] + values[i + 1] + values[i + 2]
        
        if (last === 0){
            last = current
        }

        if (current > last){
            total++
        }
        last = current
    }

    console.log(total)
}

async function ReadJSON(): Promise<number[]>{
    return fs.readFile("./input.json", 'utf-8')
    .then((res) =>  JSON.parse(res))
}