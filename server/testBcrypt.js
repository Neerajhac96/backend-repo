const bcrypt = require('bcryptjs');

async function test() {
  const plain = 'mypassword';
  const hashed = await bcrypt.hash(plain, 10);
  console.log('Hashed:', hashed);

  const match = await bcrypt.compare(plain, hashed);
  console.log('Matched:', match);
}

test();
