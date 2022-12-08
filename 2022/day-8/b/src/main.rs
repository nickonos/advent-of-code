mod input;

const RADIX: u32 = 10;

fn main() {
    let lines: Vec<&str> = input::INPUT.split("\n").collect();

    let trees: Vec<Vec<u32>> = lines.into_iter().map(|line| line.chars().map(|c| c.to_digit(RADIX).unwrap()).collect()).collect();
    let mut highest_score = 0;

    for (x, row) in trees.iter().enumerate(){
        for (y, _) in row.iter().enumerate() {
            let senic_score = get_senic_score(&trees, x, y);
            if senic_score > highest_score{
                highest_score = senic_score
            }
        }
    }


    println!("senic_score: {}", highest_score)
}

fn get_senic_score(trees: &Vec<Vec<u32>>, x: usize, y: usize) -> u32{
    let height = trees[x][y];
    let mut a =0;
    let mut b =0;
    let mut c =0;
    let mut d =0;

    if x > 0 {
        let mut j = x as isize-1;
        while j >= 0{
            a += 1;
    
            if trees[j as usize][y] >= height {
                break;
            }

            j -= 1
        }
    }

    let mut q= x + 1;
    while q < trees.len(){
        b += 1;

        if trees[q][y] >= height {
            break;
        }
        q += 1;
    }

    let mut k  = y as isize- 1;
    while k >= 0{
        c += 1;

        if trees[x][k as usize] >= height {
            break;
        }

        k -= 1
    }

    
    let mut z = y + 1;
    while z < trees[x].len(){
        d += 1;

        if trees[x][z] >= height {
            break;
        }
        z += 1
    }

    a * b * c * d
}

