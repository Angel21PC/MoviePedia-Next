export interface OverviewProps {
  movie: any;
  cast: any;
}

const Overview: React.SFC<OverviewProps> = ({ movie, cast }) => {
  return (
    <>
      <p>{movie.original_name}</p>
    </>
  );
};

export default Overview;
