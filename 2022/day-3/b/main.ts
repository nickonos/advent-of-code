import fs from "fs/promises"

main()

async function main() {
    const input: string[] = await ReadJSON()

    let values = 0;
    for (let i = 0; i < input.length; i += 3) {
        values += CheckInputs(input[i], input[i + 1], input[i + 2])
    }
    console.log(values)
}

function CheckInputs(a: string, b: string, c: string) {
    for (let char of a)
        if (b.includes(char) && c.includes(char)) {
            return GetValue(char)
        }
    console.error("Not found")
    return 0
}

function GetValue(str: string) {
    const Ascii = str.charCodeAt(0)
    if (isLowerCase(str)) {
        return Ascii - 96
    }
    return Ascii - 64 + 26;
}

function isLowerCase(str: string) {
    return str == str.toLowerCase() && str != str.toUpperCase();
}

async function ReadJSON() {
    return fs.readFile("./input.json", 'utf-8')
        .then((res) => JSON.parse(res))
}