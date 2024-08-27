import { SaveFile } from './save-file-use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {

    /*beforeEach(() => {
        fs.rmSync('outputs', {recursive : true});   //para borrar la carpeta outputs antes de cda prueba.
    });*/


    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if(outputFolderExists) fs.rmSync('outputs', {recursive : true});
    });

    test('deberia guardar el archivo con los valores por defecto', () => {
        const saveFile = new SaveFile();

        const filePath = 'outputs/table.txt'
       
        const result = saveFile.execute({ fileContent: 'test content', fileDestination :'outputs', fileName :'table'} );
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding : 'utf-8'});
        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        expect(fileContent).toBe('test content');
    });

    test('debe guardar archivo con valores personalizados', () => {
        const options = {
            fileContent : 'custom content',
            fileDestination : 'custom-output/file-destination', 
            fileName : 'custom-table-name',
        }
        const saveFile = new SaveFile();
        const filePath = `${options.fileDestination}/${options.fileName}.txt`;
        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding : 'utf-8'});
        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    /*
    test('debe retornar false si el directorio no puede ser creado', () => {
        const options = {
            fileContent : 'custom content',
            fileDestination : 'custom-output/file-destination', 
            fileName : 'custom-table-name',
        }
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(                    //spyOn() : espía la funcion mkdirSync.  //mockImplementation : sobreescribe la funcionalidad de mkdirSync() por () => {throw new Error('error');}.
            () => {throw new Error('ESTE ES UN MENSAJE DE ERROR PERSONALIZADO DESDE TESTING');}
        );
        const result = saveFile.execute(options);
        expect(result).toBe(false);
    });
    */

   

});