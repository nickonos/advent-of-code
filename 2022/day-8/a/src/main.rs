mod input;

const RADIX: u32 = 10;

fn main() {

    let trees: Vec<&str> = input::INPUT.split("\n").collect();
    let mut count = 0;
    
    for (y, row) in trees.iter().enumerate() {
        for (x, height_char) in row.chars().enumerate(){
            let height = height_char.to_digit(RADIX).unwrap();
            if check_row(row, x, height) || check_column(&trees, x, y, height){
                count += 1;
            }
        }
    }

    println!("count: {}", count)
}

fn check_column(trees: &Vec<&str>, x: usize, y: usize, height: u32) -> bool{
    let top_slice = trees.get(..y).unwrap();
    let mut visible_from_top = true;

    for str in top_slice{
        let c = str.as_bytes()[x] as char;

        if c.to_digit(RADIX).unwrap() >= height{
            visible_from_top = false;
        }
    }

    let bottom_slice = trees.get(y+ 1..trees.len()).unwrap();
    let mut visible_from_bottom = true;

    for str in bottom_slice{
        let c = str.as_bytes()[x] as char;
        
        if c.to_digit(RADIX).unwrap() >= height{
            visible_from_bottom = false;
        }
    }

    visible_from_bottom || visible_from_top
}

fn check_row(row: &str, x: usize, height: u32) -> bool{
    let left_slice = row.get(..x).unwrap();
    let mut visible_from_left = true;

    for c in left_slice.chars(){
        if c.to_digit(RADIX).unwrap() >= height{
            visible_from_left = false;
        }
    }

    let right_slice = row.get(x+ 1..row.len()).unwrap();
    let mut visible_from_right = true;

    for c in right_slice.chars(){
        if c.to_digit(RADIX).unwrap() >= height{
            visible_from_right = false;
        }
    }

    visible_from_left || visible_from_right
}
