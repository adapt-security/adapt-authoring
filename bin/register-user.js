const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const config = require(`../conf/${process.env.NODE_ENV}.config.js`);

async function register() {
  const client = new MongoClient(config['adapt-authoring-mongodb'].connectionUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try { 
    await client.connect();
  } catch(e) {
    return exit(e);
  }
  const email = process.env.aat_email;
  if(!email) return exit(new Error('Must specify email'));
  const plainPassword = process.env.aat_password;
  if(!plainPassword) return exit(new Error('Must specify password'));

  bcrypt.genSalt(config['adapt-authoring-localauth'].saltRounds, (saltError, salt) => {
    if(saltError) return exit(saltError);
    bcrypt.hash(plainPassword, salt, (hashError, password) => {
      if(hashError) return exit(hashError);
      client.db().collection('users').insertOne({ email, password })
        .then(() => exit(`Registered new user '${email}'`))
        .catch(exit);
    });
  });
}

function exit(message) {
  console.log(message.message || message);
  process.exit(message instanceof Error ? 1 : 0);
}

module.exports = register();