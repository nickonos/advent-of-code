import fs from "fs/promises"

main()

async function main(){
  
}

async function ReadJSON(){
    return fs.readFile("./input.json", 'utf-8')
    .then((res) =>  JSON.parse(res))
}