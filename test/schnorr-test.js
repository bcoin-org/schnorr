/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';

const assert = require('./util/assert');
const secp256k1 = require('bcrypto/lib/secp256k1');
const hash256 = require('bcrypto/lib/hash256');
const schnorr = require('../');

describe('Schnorr', function() {
  it('should do proper schnorr', () => {
    const key = secp256k1.privateKeyGenerate();
    const pub = secp256k1.publicKeyCreate(key, true);
    const msg = hash256.digest(Buffer.from('foo', 'ascii'));
    const sig = schnorr.sign(msg, key);
    assert.strictEqual(schnorr.verify(msg, sig, pub), true);
    assert.bufferEqual(schnorr.recover(sig, msg), pub);
  });
});
