export interface CastProps {
  cast: any;
}

const Cast: React.SFC<CastProps> = ({ cast }) => {
  //url base para las imagenes
  const base_Url = "https://image.tmdb.org/t/p/original/";

  return (
    <>
      {cast?.data.cast.map((actor) => (
        <div className="actor" key={actor.id}>
          <img
            key={actor.id}
            className="actor_poster"
            src={`${base_Url}${actor?.profile_path}`}
            alt={actor?.name}
          ></img>
          <p>{actor.name}</p>
        </div>
      ))}
      <style jsx>{`
        .actor_poster {
          object-fit: cover;
          max-height: 200px;

          transition: transform 450ms;
          border-radius: 10px;
          -webkit-box-shadow: 0 5px 5px 0 rgba(80, 79, 79, 0.3);
          box-shadow: 0 5px 5px 0 rgba(19, 18, 18, 0.3);
          margin-top: 5vh;
          margin-left: 1vw;
        }
      `}</style>
    </>
  );
};

export default Cast;
