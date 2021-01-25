const db = require('../db.js')
var fs = require('fs')
var contents = fs.readFileSync("sliderImages", 'utf8');
jest.mock('fs')

describe('db', () => {
    it('can read', async () => {
        const data = [{ title: 'hi', done: true }]
        fs.setReadFileMock('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStricEqual(data)
    })
    it('can write', async () => {
        let fakeFile
        fs.setWriteFileMock('/yyy', (path, data, callback) => {
            fakeFile = data
            callback(null)
        })
        const list = [{ title: '见古力娜扎', done: true }, { title: '见迪丽热巴', done: true }]
        await db.write(list, '/yyy')
        expect(fakeFile).toBe(JSON.stringify(list) + '\n')
    })
})