import { useEffect, useRef, useState } from "react";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
import debounce from "lodash/debounce";
import { prepareForNewSearch } from "./searchCardsSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    flexShrink: 1,
  },
  input: {
    "& input": {
      width: "100%",
    },
  },
}));

const SearchCards = () => {
  // const navigate = useNavigate();
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const search = (query) => {
    if (query.trim()) {
      dispatch(prepareForNewSearch(query));
      // navigate(`/search/${query}`);
    }
  };

  const debouncedSearch = useRef(debounce(search, 500));

  const { query2 } = useParams();
  console.log("query2", query);
  useEffect(() => {
    if (typeof query2 !== "undefined") {
      setQuery(query2);
    }
  }, []);

  useEffect(() => {
    debouncedSearch.current(query);
  }, [query]);

  const handleRequestSearch = () => {
    debouncedSearch.current.cancel();
    search(query);
  };

  return (
    <div className={classes.root}>
      <SearchBar
        value={query}
        onChange={setQuery}
        onRequestSearch={handleRequestSearch}
        classes={{
          input: classes.input,
        }}
      />
    </div>
  );
};

export default SearchCards;
