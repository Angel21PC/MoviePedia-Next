// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, {request as r} from '../../../tmdb/index';

export default async (
  req, 
  res
) => {
  
  const page:number = req.query.p

  try {
    const request = await axios.get(r.fetchPopular_Movie+`&page=${page}`);
    res.status(200).json({data: request.data})
  } catch (error) {
    res.status(200).json(error)
  }
 
}
