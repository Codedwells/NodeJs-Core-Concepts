import fs from 'fs/promises';

(async () => {
    const watcher = fs.watch('./command.txt');

    const COMMANDS = {
        CREATE_FILE: 'create a file'
    };

    const createFile = async (path) => {
        try {
            // Check if we already have the file
            const isExisting = fs.open(path, 'r');
            isExisting.close();

            if (isExisting) {
                console.log(`The file path ${path} already exists!!`);
            }
        } catch (e) {
            let createHandler = fs.writeFile(path, 'Our new file has been created');
            
        }
    };

    for await (const event of watcher) {
        let commandFileHandler = await fs.open(event.filename, 'r');

        commandFileHandler.on('change', async () => {
            // Size of file to be read
            const fileSize = (await commandFileHandler.stat()).size;

            // Read file options
            const buff = Buffer.alloc(fileSize);
            const length = buff.byteLength;
            const position = 0;
            const offset = 0;

            // Read the file
            await commandFileHandler.read(buff, offset, length, position);

            // close file handler
            commandFileHandler.close();

            // Decoder
            const command = buff.toString('utf-8').toLowerCase().trim();

            if (command.includes('create a file')) {
                const filePath = command.split(' ');

                createFile(filePath[filePath.length - 1]);
            }
        });

        if (event.eventType === 'change' && event.filename === 'command.txt') {
            commandFileHandler.emit('change');
        }
    }
})();
