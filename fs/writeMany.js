import fs from 'fs/promises';

const writeMany = async () => {
    let string = 'Hello world';

    let myFile = await fs.open('./trial.txt', 'w');
    console.time('writeTime');
    let i = 0;

    while (i <= 1_000_000) {
        await myFile.write(string);
        i++;
    }

    console.timeEnd('writeTime');

    myFile.close();
};

writeMany();
