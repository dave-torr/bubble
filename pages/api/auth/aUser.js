import nextConnect from 'next-connect';
import authMidWare from '../../../middleware/userAuthMiddleware';
import { extractUser } from '../../../utils/auth/userHelper';

const handler = nextConnect()
.use(authMidWare)

.get(async (req, res) => {
    
    res.json({ user: extractUser(req) })

    })

export default handler;
