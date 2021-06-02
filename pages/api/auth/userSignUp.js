import bcrypt from 'bcryptjs';

import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { extractUser } from '../../../utils/auth/userHelper';

import authMidWare from '../../../middleware/userAuthMiddleware';

const handler = nextConnect();

handler.use(authMidWare); 
handler.post(async (req, res) => {
      let reqData = req.body
        reqData = JSON.parse(reqData);
  const { name, password } = reqData;
  const email = normalizeEmail(reqData.email); 
  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.');
    return;
  }
  if (!password || !name) {
    res.status(400).send('Missing field(s)');
    return;
  }
  // check if email existed
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await req.db
    .collection('users')
    .insertOne({ 
      name,
      email, 
      password: hashedPassword, 
      company: "bubl S.A.",
      userType: "partner",
      signUpStream: "website",
       })
    .then(({ ops }) => ops[0]);
      req.logIn(user, (err) => {
      if (err) throw err;
    res.status(201).json({
      user: extractUser(req),
    });
  });
});

export default handler;