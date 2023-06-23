import fs from 'fs/promises';

const writeMany = async () => {
    const myFile = await fs.open('./trial.txt', 'w');
    const stream = myFile.createWriteStream();
    let i = 0;

    const writeToFile = () => {
        while (i < 1_000_000) {
            const buff = Buffer.from(`${i} `, 'utf8');

            if (!stream.write(buff)) {
                // If the stream's internal buffer is full, wait for the 'drain' event
                stream.once('drain', writeToFile);
                return;
            }

            i++;
        }

        // After writing all data, close the stream and the file
        stream.end();
        myFile.close();
    };

    writeToFile();
};

writeMany();
