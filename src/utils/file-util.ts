import fs from "fs"
import path from 'path';

const pathProject = path.join(__dirname, '../../');

const createFileAsync = async (pathFile: string, data: any, encoding: BufferEncoding = 'utf8'): Promise<Boolean> => {
    return new Promise((resolve) => {
        fs.writeFile(`${pathProject}/${pathFile}`, data, { encoding }, (err) => {
            if (err) {
                resolve(false)
            }
            resolve(true)
        });
    });
}

export {
    createFileAsync
}