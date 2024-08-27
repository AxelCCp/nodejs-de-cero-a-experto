//98
const runCommand = async(args : string[]) => {
    process.argv = [ ...process.argv, ...args];
    const {yarg} = await import('./yars.plugin');
    return yarg;
}

describe('Test args,plugin.ts', () => {
    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('shoould return default values', async() => {
        const argv = runCommand(['-b', '5']);
        console.log(argv);
       /* 
        expect(argv).toEqual(expect.objectContaining(
            {
                argv: {
                  b: 5,
                  l: 10,
                  s: false,
                  n: 'multiplication-table',
                  d: 'outputs'
                }
            }
        ));
        */
    });
    
    /*
    test('debe retornar la configuracion con valores personalizados', async() => {
        const argv = await runCommand(['-b', '8', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']);
        expect(argv).toEqual(expect.objectContaining(
            {
                argv: {
                  b: 8,
                  l: 20,
                  s: true,
                  n: 'custom-name',
                  d: 'custom-dir'
                }
            }
        ));
    });
    */
    
});