//Usual configurations for running application

const responseCode = {
    success: 200,
    created: 201,
    empty: 204,
    bad: 400,
    unauthorized: 401,
    forbidden: 403,
    lost: 404
};

const message = {
  ping: 'This is a ping message',
  ack: 'This is an acknowledgement',
  unauthorized: 'Unauthorized: Please authenticate yourself',
  dumbPassword: 'Password must not contain word: password',
  passwordError: 'Invalid user or passsword or both',
  invalidAction: 'This action is not valid'
};

const flags = {
  token: 'something-remains-uncool'
}

module.exports = { responseCode, message, flags };