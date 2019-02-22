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
/*const nock = require('nock');*/

/**************************************************************************************/
/*************************** TEST UNITAIRE *********************************/
/**************************************************************************************/



describe('Test Unitaire GET/POST/PUT/DELETE', () => {
  console.log("Test Unitaire ")

/*/GET
Que la réponse ait un status 200 
Que la clé books de la réponse simulé soit un array
*/




it('Test GET status 200', (done) => {
  
  nock('http://localhost:8080/')
  	chai 
  	.request(server)
    .get('/book')
    .end((err, res)=>{
    	expect(res).to.have.status(200)
    	expect(res.body.books).to.be.a('array')
    if(err){
    	console.log("c'est normal bb");
    }
    	
    done();
    })


});


/*/POST
Que la réponse ait un status 200 
Que la clé message de la réponse simulé soit :
‘book successfully added’
*/


it('Test POST status 200', () => {
  
  nock('http://localhost:8080/')
  	chai 
  	.request(server)
    .post('/book')
    .send({"name":"I.robot"})
    .end((err, res)=>{
    	expect(res).to.have.status(200)
    	expect(res.body.message).to.equal('book successfully added')
    	/*console.log(res.body)*/
    done();
    })

  
});


/*
/PUT 
Que la réponse ait un status 200 
Que la clé message de la réponse simulé soit :  ‘book successfully updated’ 
*/


it('Test PUT status 200', () => {
  
  nock('http://localhost:8080/')
  	chai 
  	.request(server)
    .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
    .send({"name":"I.robot"})
    .end((err, res)=>{
    	expect(res).to.have.status(200)
    	expect(res.body.message).to.equal('book successfully updated')
    	/*console.log(res.body)*/
    done();
    })

  
});

/*/DELETE
Que la réponse ait un status 200 
Que la clé message de la réponse simulé soit :  ‘book successfully deleted’ 
*/


it('Test DELETE status 200', () => {
  
  nock('http://localhost:8080/')
  	chai 
  	.request(server)
    .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
    .end((err, res)=>{
    	expect(res).to.have.status(200)
    	expect(res.body.message).to.equal('book successfully deleted')
    	/*console.log(res.body)*/
    done();
    })

  
});
})


/*suppression database*/

describe('Test Unitaire erreur GET/POST/PUT/DELETE', () => {
  console.log("Test Unitaire erreur ")

  console.log("Database vidé")
    let emptyBooks = {
        books : []
    }
    let book = {"id":"0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9","title":"Coco raconte Channel 2","years":1990,"pages":400}

    beforeEach(() => {
        resetDatabase(path.join(__dirname, '../data/books.json'), emptyBooks)
    })

/*/GET
Que la réponse ait un status 400 
Que la clé message de la réponse simulé soit :  ‘error fetching books’ */

it('Test GET status 400', () => {
  
  nock('http://localhost:8080/')
  	chai 
  	.request(server)
  	.get('/book')
    .end((err, res)=>{
    	expect(err).to.have.status(400)
    	expect(err.body.message).to.equal('error fetching books')
    done();
    })

  
});

/*/POST
Que la réponse ait un status 400 
Que la clé message de la réponse simulé soit :  ‘error adding the book’ */

it('Test POST status 400', () => {
  
  nock('http://localhost:8080/')
  	chai 
  	.request(server)
    .post('/book')
    .send({"name":"I.robot"})
    .end((err, res)=>{
    	expect(err).to.have.status(400)
    	expect(err.body.message).to.equal('error adding the book')
    	/*console.log(res.body)*/
    done();
    })

  
});

/*/PUT
Que la réponse ait un status 400 
Que la clé message de la réponse simulé soit :  ‘error updating the book’ */

it('Test PUT status 400', () => {
  
  nock('http://localhost:8080/')
  	chai 
  	.request(server)
    .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
    .send({"name":"I.robot"})
    .end((err, res)=>{
    	expect(err).to.have.status(400)
    	expect(err.body.message).to.equal('error updating the book')
    	/*console.log(res.body)*/
    done();
    })

  
});


/*/DELETE
Que la réponse ait un status 400 
Que la clé message de la réponse simulé soit :  ‘error deleting the book’ */


it('Test DELETE status 400', () => {
  
  nock('http://localhost:8080/')
  	chai 
  	.request(server)
    .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
    .end((err, res)=>{
    	expect(err).to.have.status(400)
    	expect(err.body.message).to.equal('error deleting the book')
    	/*console.log(res.body)*/
    done();
    })

  
});
})
