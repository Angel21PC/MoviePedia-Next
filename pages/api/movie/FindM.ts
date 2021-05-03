import axios, {request as r} from '../../../tmdb/index';
  
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)
export default async (
  req, 
  res
) => {
  await cors(req, res)
  const text:string = req.query.text

  // try {
  //   const request = await axios.get(r.fetchFindMovie.concat(`&query=`+text));
  //   res.status(200).json({data: request.data})
  // } catch (error) {
  //   res.status(200).json(error)
  // }
 
  try {
    const request = await fetch(r.fetchFindMovie.concat(`&query=`+text));
    res.status(200).json({data: request})
  } catch (error) {
    res.status(200).json(error)
  }
}