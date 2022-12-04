import fs from "fs/promises"

main()

async function main() {
    const input: string[] = await ReadJSON()

    let values = 0;
    input.map((str) => {
        const left = str.slice(0, str.length / 2)
        const right = str.slice(str.length / 2)
        for(let i of left){
            if (right.includes(i)){
                const Ascii = i.charCodeAt(0)
                if (isLowerCase(i)){
                    const added = Ascii - 96
                    values += added

                    return
                }
                const added = Ascii - 64 + 26;
                values += added

                return
            }
        }
    })
    console.log(values)
}

function isLowerCase(str: string){
    return str == str.toLowerCase() && str != str.toUpperCase();
}

async function ReadJSON() {
    return fs.readFile("./input.json", 'utf-8')
        .then((res) => JSON.parse(res))
}