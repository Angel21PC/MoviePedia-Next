import axios, {request as r} from '../../../tmdb/index';

export default async (
  req, 
  res
) => {
  
  try {
    const request = await axios.get(r.fetchGenre_Tv);
    console.log(request)
    res.status(200).json({data: request.data})
  } catch (error) {
    res.status(200).json(error)
  }
 
}