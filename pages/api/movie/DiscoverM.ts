import axios, {request as r} from '../../../tmdb/index';

export default async (
  req, 
  res
) => {
  
  const page = req.query.p
  const g = req.query.g
  // console.log(e)
  try {
    const request = await axios.get(r.fetchDiscover_Movie+`&page=${page}&with_genres=`+g);
    res.status(200).json({data: request.data})
  } catch (error) {
    res.status(200).json(error)
  }
 
}