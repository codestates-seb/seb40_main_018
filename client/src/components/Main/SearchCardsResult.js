// import { useSelector } from "react-redux";
// import InfiniteMoviesList from "../../app/InfiniteMoviesList";
// import { useInfiniteQuery } from "react-query";
// import { searchMovies } from "../../tmdb-api/api";
// import MovieCard from "../../app/MovieCard";

// const SearchCardsResult = () => {
//   const query = useSelector((state) => state.searchCards.query);

//  const searchMovies = (
//     query,
//     page = 1
//   ): Promise<MovieListResult> {
//     const url = generateUrl('search/movie', { query, page });

//     return handleApiCall(url);
//   }
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
//     ["searchMovies", query],
//     ({ pageParam = 1 }) => searchMovies(query, pageParam),
//     {
//       getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : false),
//       enabled: query !== "",
//     },
//   );

//   const movies = data?.pages.reduce((result, page) => result.concat(page.results), []);

//   return (
//     <InfiniteMoviesList items={movies} hasMore={hasNextPage} isFetching={isFetchingNextPage} fetchItems={fetchNextPage}>
//       {(movie) => <MovieCard movie={movie} />}
//     </InfiniteMoviesList>
//   );
// };

// export default SearchCardsResult;
