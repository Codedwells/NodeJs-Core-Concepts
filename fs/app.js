import fs from 'fs/promises';

(async () => {
    const watcher = fs.watch('./command.txt');

    const Commands = {
        CREATE_FILE: 'create', // <COMMAND> | <filepath>
        DELETE_FILE: 'remove', // <COMMAND> | <filepath>
        RENAME_FILE: 'rename', // <COMMAND> | <oldPath> | <renamePath>
        ADDTO_FILE: 'add' // <COMMAND> | <filePath> | <data>
    };

    const createFile = async (path) => {
        try {
            // Check if we already have the file
            const isExisting = await fs.open(path, 'r');
            if (isExisting) {
                console.log(`CreateError:The file path ${path} already exists!!`);
            }
            isExisting.close();
        } catch (e) {
            await fs.writeFile(path, 'Our new file has been created');
            console.log(`New file has been created at ${path}`);
        }
    };

    const deleteFile = async (path) => {
        try {
            const isExisting = await fs.open(path, 'r');

            await fs.unlink(path);

            console.log(`File at :${path} has been removed successfully`);

            isExisting.close();
        } catch (e) {
            console.log(`DeleteError :We could not find the file at : ${path} `);
        }
    };

    const renameFile = async (oldPath, newPath) => {
        try {
            const isExisting = await fs.open(oldPath, 'r');

            await fs.rename(oldPath, newPath);

            console.log(`The file at :${oldPath} has been renamed to :${newPath}`);

            isExisting.close();
        } catch (err) {
            console.log(`RenameError : ${err.message} `);
        }
    };

    const addToFile = async (path, content) => {
        try {
            const isExisting = await fs.open(path, 'r');

            await fs.appendFile(path, content.trim());

            console.log(`We have added : ${content} to : ${path}`);

            isExisting.close();
        } catch (err) {
            console.log(`AddToFileError : ${err.message} `);
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
            const file = buff.toString('utf-8').toLowerCase().trim().split('|');
            const command = file[0]

            

            //Creates a file
            // <COMMAND> | <filepath>
            if (command.includes(Commands.CREATE_FILE)) {
                const path = file[file.length - 1].trim();

                createFile(path);
            }

            //Deletes A file
            // <COMMAND> | <filePath>
            if (command.includes(Commands.DELETE_FILE)) {
                const path = file[file.length - 1].trim();

                deleteFile(path);
            }

            // Rename a file
            // <COMMAND> | <oldPath> | <renamePath>
            if (command.includes(Commands.RENAME_FILE)) {
                let oldPath = file[file.length - 2].trim();
                let newPath = file[file.length - 1].trim();
                renameFile(oldPath, newPath);
            }

            // <COMMAND> | <filePath> | <data>
            if (command.includes(Commands.ADDTO_FILE)) {
                let data = file[file.length - 1].trim();
                let path = file[file.length - 2].trim();

                addToFile(path, data);
            }
        });

        if (event.eventType === 'change' && event.filename === 'command.txt') {
            commandFileHandler.emit('change');
        }
    }
})();
