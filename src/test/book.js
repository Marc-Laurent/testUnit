import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import chaiNock from 'chai-nock'
import chaiAsPromised from 'chai-as-promised'
import path from 'path'
import nock from 'nock'

import server from '../server'
import resetDatabase from '../utils/resetDatabase'

chai.use(chaiHttp)
chai.use(chaiNock)
chai.use(chaiAsPromised)

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier

/**************************************************************************************/
/*************************** FUNCTION TEST ALL ROUTES *********************************/
/**************************************************************************************/

const testRoutes = (book, all) => {
  let books =  book ? [book] : []

  it('GET BOOK', (done) => {
      chai
          .request(server)
          .get('/book')
          .end((err, res) => {
              expect(res).to.have.status(200)
              expect(res.body).to.be.a('object')
              expect(res.body.books).to.be.a('array')
              expect(res.body.books.length).to.equal(0)
              done()
          })
  })

  it('POST BOOK', (done) => {
      chai
          .request(server)
          .post('/book')
          .send(books)
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).to.equal('book successfully added')
            done()
          })
  })

  if(all){
    it('GET BOOK ID', (done) => {
        chai
            .request(server)
            .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .send(book)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.message).to.be.a('string')
                expect(res.body.message).equal('book fetched')
                expect(res.body.book).to.be.a('object')
                expect(res.body.book.title).to.be.a('string')
                expect(res.body.book.years).to.be.a('number')
                done()
            })
    })

    it('PUT BOOK ID', (done) => {
        chai
            .request(server)
            .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .send(books)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.message).to.be.a('string')
                expect(res.body.message).equal('book successfully updated')
                done()
            })
    })

    it('DELETE BOOK ID', (done) => {
        chai
            .request(server)
            .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .send(books)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.message).to.be.a('string')
                expect(res.body.message).equal('book successfully deleted')
                done()
            })
    })
  }
}

/*************************************************************************************/
/*************************************************************************************/
/*************************************************************************************/

describe('Test intégration (Empty database)', () => {
  console.log("Test intégration (Empty database)")

    let emptyBooks = {
        books : []
    }
    let book = {"id":"0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9","title":"Coco raconte Channel 2","years":1990,"pages":400}

    beforeEach(() => {
        resetDatabase(path.join(__dirname, '../data/books.json'), emptyBooks)
    })

    testRoutes(book, false)
})


describe('Test intégration (Not empty database)', () => {
  console.log("Test intégration (Not empty database)")

    let emptyBooks = {
        books : []
    }

    let book = {"id":"0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9","title":"Coco raconte Channel 2","years":1990,"pages":400}
    let books = [book]

    beforeEach(() => {
        resetDatabase(path.join(__dirname, '../data/books.json'), emptyBooks)
        if(!emptyBooks.books.length) emptyBooks.books = books
    })

    testRoutes(book, true)
})
