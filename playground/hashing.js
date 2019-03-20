const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
/*
 using bcrypt  in order to verify the password:

    1. the user enters a password
    2. we hash the password
    3. we compare it to tht stored hash
    4. same password = true / different password = false


*/
var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$WikfVwgX.1ZCoy64Y7NoNe1mUAf7zNtLp5hk.ZrV5muQ65p1LaoAq';

bcrypt.compare('123', hashedPassword, (err, res) => {
    console.log(res);
} )



/*
 using jsonwebtoken - jwt

var data = {
    id: 10
};

var token = jwt.sign(data, '123456');
console.log(token);

var decoded = jwt.verify(token, '123456');
console.log(decoded);
*/
/*
// adding the '1' causes the hash to cahnge --> not valid (JsonWebTokenError: invalid signature)
decoded = jwt.verify(token + '1', '123456');
console.log(decoded);

// changing the password causes the hash to cahnge --> not valid (JsonWebTokenError: invalid signature)
decoded = jwt.verify(token + '1', '1234567');
console.log(decoded);
*/

/*

// using crypto-js

var message = 'I am user number 3';
var hash = SHA256(message).toString();
console.log(`Message: ${message}`)
console.log(`Hash: ${hash}`)

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// change data --> hash is nott the same anymore
token.data.id = 5; 
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust');
}

*/
