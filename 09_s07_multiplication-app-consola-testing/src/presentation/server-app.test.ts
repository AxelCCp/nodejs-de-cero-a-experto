import { CreateTable } from '../config/domain/use-cases/create-table.use-case';
import { SaveFile } from '../config/domain/use-cases/save-file-use-case';
import { ServerApp } from './server-app';  

describe('Server app', () => {

    test('debe crear una instancia de ServerApp', () => {
        console.log('debe crear una instancia de ServerApp');
        const serverapp = new ServerApp();
        expect(serverapp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('debe correr el ServerApp con opciones', () => {
        console.log('debe correr el ServerApp con opciones');
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
        const options = {
            base : 2,
            limit : 10,
            showTable : false,
            fileDestination : 'test-destination',
            fileName : 'test-filename'
        };
        ServerApp.run(options);
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenCalledWith('Server run');
        expect(logSpy).toHaveBeenLastCalledWith('archivo creado');
        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith( {"base": 2, "limit": 10} );

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith(
            {
                fileContent : expect.any(String),
                fileName : options.fileName,
                fileDestination : options.fileDestination
            });
    });

    /*
    test('debe correr con valores personalizados mocked', () => {
        const options = {
            base : 2,
            limit : 10,
            showTable : false,
            fileDestination : 'test-destination',
            fileName : 'test-filename'
        };

        const logmock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn();
        const saveFileMock = jest.fn();

        console.log = logmock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock();
        SaveFile.prototype.execute = saveFileMock;
        ServerApp.run(options);

        expect(logmock).toHaveBeenCalledWith('Server run');
        expect(createMock).toHaveBeenCalledWith({"base": 2, "limit": 10});
    });
    */

});