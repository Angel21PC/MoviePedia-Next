// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, {request as r} from '../../../tmdb/index';

export default async (
  req, 
  res
) => {
  
  const page:number = req.query.p
  // console.log(page)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  try {
    const request = await axios.get(r.fetchPopular_Movie+`&page=${page}`);
    res.status(200).json({data: request.data})
  } catch (error) {
    res.status(200).json(error)
  }
 
}
