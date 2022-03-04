import { useState, useCallback } from "react";
import SearchBox from "../components/SearchBox";
import axios from "axios";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";
import Results from "../components/Results";

function HostelsSearch() {
  const [searchFilter, setSearchFilter] = useState({});
  const [searchResults, setSearchResults] = useState({ holidays: [] });
  const [fetching, setFetching] = useState({
    status: false,
    searched: false,
    errors: [],
  });

  const getSearchResults = useCallback(() => {
    setFetching({ ...fetching, status: true, searched: true, errors: [] });
    axios
      .post("/cjs-search-api/search", {
        ...searchFilter,
        departureDate: moment(searchFilter.departureDate).format("DD-MM-YYYY"),
        bookingType: "hotel",
        partyCompositions: [
          {
            adults: 2,
            childAges: [],
            infants: 0,
          },
        ],
      })
      .then(({ data }) => {
        setSearchResults(data.holidays);
        setFetching({ ...fetching, status: false, errors: [] });
      })
      .catch((err) => {
        console.log(err);
        setFetching({
          ...fetching,
          status: false,
          errors: err.response.data.errors || [],
        });
      });
  }, [searchFilter]);

  return (
    <>
      <SearchBox
        cbSearch={getSearchResults}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        fetching={fetching}
      />

      {!!fetching && (fetching.status || fetching.errors.length > 0) ? (
        <Grid container sx={{ justifyContent: "center", maxWidth: "100%" }}>
          {!!fetching && fetching.errors && fetching.errors.length > 0 ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {fetching.errors[0]}
            </Alert>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      ) : (
        <>
          <Results
            holidays={searchResults}
            searched={fetching.searched}
            searchFilter={searchFilter}
          />
        </>
      )}
    </>
  );
}

export default HostelsSearch;
