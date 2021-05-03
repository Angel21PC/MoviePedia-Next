import axios, {request as r} from '../../../tmdb/index';

export default async (
  req, 
  res
) => {
  
  const text:string = req.query.text

  try {
    const request = await axios.get(r.fetchFindMovie.concat(`&query=`+text));
    res.status(200).json({data: request.data})
  } catch (error) {
    res.status(200).json(error)
  }
 
}