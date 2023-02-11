var bit = require('./bitcore-ecies/index.js');
console.log((typeof bit.ECIES))
var PrivateKey = bit.bitcore.PrivateKey;
var aliceKey = new PrivateKey('L1Ejc5dAigm5XrM3mNptMEsNnHzS7s51YxU7J61ewGshZTKkbmzJ');
var bobKey = new PrivateKey('KxfxrUXSMjJQcb3JgnaaA6MqsrKQ1nBSxvhuigdKRyFiEm6BZDgG');
var carolKey = new PrivateKey('afb1a73ec390ca54d5ceb19f6f085c9ee97f27244a27c15aa4abbf4eba4cc6a8');

var alice = bit.ECIES()
    .privateKey(aliceKey)
    .publicKey(bobKey.publicKey);

var aliceCare = bit.ECIES()
    .privateKey(aliceKey)
    .publicKey(carolKey.publicKey)

var bob = bit.ECIES()
    .privateKey(bobKey)
    .publicKey(aliceKey.publicKey);

var carol = bit.ECIES()
    .privateKey(carolKey)
    .publicKey(aliceKey.publicKey);

var message = JSON.stringify({lunch: 'date'});

// starting node
console.log('--- signer ---')

var ciphertext = aliceCare.encrypt(message);
console.log(ciphertext)

var ciphertext2 = alice.encrypt(ciphertext);
console.log(ciphertext2)

// relay
console.log('--- relaying ---')

var ciphertextUnwrap = bob.decrypt(ciphertext2)
console.log(ciphertextUnwrap)

try{
  console.log(typeof JSON.parse(decrypted.toString()) == 'object')
}catch(e){
  console.log('passing particle...')
}

// end node
console.log(Buffer.isBuffer(ciphertextUnwrap) == true)

var decrypted = carol.decrypt(ciphertextUnwrap)
console.log('--- decrypted ---')

console.log(typeof JSON.parse(decrypted.toString()) == 'object')
console.log(decrypted.toString() == message)
console.log(decrypted.toString())
