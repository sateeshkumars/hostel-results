import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ApplyFilters from "./ApplyFilters";

const destinations = [
  { label: "New York", value: "new-york" },
  { label: "Orlando", value: "orlando" },
  { label: "Barbados", value: "barbados" },
  { label: "Toronto", value: "toronto" },
];

function SearchBox({ cbSearch, searchFilter, setSearchFilter, fetching }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", width: "100%" }}
    >
      <Grid item>
        <Autocomplete
          disablePortal
          options={destinations}
          sx={{ width: 200 }}
          onChange={(_, data) =>
            setSearchFilter({
              ...searchFilter,
              location: !!data && data.value ? data.value : null,
            })
          }
          renderInput={(params) => (
            <TextField {...params} label="Destination" focused />
          )}
        />
      </Grid>
      <Grid item>
        <TextField
          type="date"
          label="Depature date"
          focused
          onChange={({ target: { value } }) =>
            setSearchFilter({
              ...searchFilter,
              departureDate: value,
            })
          }
        />
      </Grid>
      <Grid item>
        <TextField
          type="number"
          label="Duration"
          focused
          onChange={({ target: { value } }) =>
            setSearchFilter({
              ...searchFilter,
              duration: value,
            })
          }
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          sx={{ width: "120px", height: "50px" }}
          onClick={cbSearch}
          disabled={!fetching || fetching.status}
        >
          Search
        </Button>
      </Grid>
      <Grid item>
        <ApplyFilters
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          sx={{ height: "50px" }}
          onClick={() => {
            setSearchFilter({
              ...searchFilter,
              hotelFacility: null,
              pricePerPerson: null,
              starRating: null,
            });
          }}
          disabled={!fetching || fetching.status}
        >
          Clear Filters
        </Button>
      </Grid>
    </Grid>
  );
}

export default React.memo(SearchBox);
