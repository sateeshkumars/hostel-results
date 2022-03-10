import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Autocomplete from "@mui/material/Autocomplete";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Stack } from "@mui/material";
import Slide from "@mui/material/Slide";

const hotelFacilities = [
  { label: "Restaurant", value: "Restaurant" },
  { label: "Room Service", value: "Room Service" },
  { label: "Valet parking", value: "Valet parking" },
  { label: "Fitness Centre/Gym", value: "Fitness Centre/Gym" },
  { label: "Laundry Service", value: "Laundry Service" },
  { label: "Internet Access", value: "Internet Access" },
];

const starRatings = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ApplyFilters({ searchFilter, setSearchFilter }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ height: "50px" }}
      >
        Apply Filters
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Apply Filters</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <FormControl fullWidth sx={{ mt: 1 }} focused>
              <InputLabel htmlFor="outlined-adornment-amount">
                Price per person
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={searchFilter.pricePerPerson}
                onChange={({ target: { value } }) =>
                  setSearchFilter({
                    ...searchFilter,
                    pricePerPerson: Number(value) ? Number(value) : "",
                  })
                }
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Price per person"
              />
            </FormControl>

            <Autocomplete
              disablePortal
              options={hotelFacilities}
              value={searchFilter.hotelFacility}
              onChange={(_, data) =>
                setSearchFilter({
                  ...searchFilter,
                  hotelFacility: data.value || "",
                })
              }
              onInputChange={(_, data) => {
                if (!data) {
                  setSearchFilter({
                    ...searchFilter,
                    hotelFacility: "",
                  });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Hotel Facilities" focused />
              )}
            />

            <Autocomplete
              disablePortal
              options={starRatings}
              value={searchFilter.starRating}
              onInputChange={(_, data) => {
                if (!data) {
                  setSearchFilter({
                    ...searchFilter,
                    starRating: "",
                  });
                }
              }}
              onChange={(_, data) =>
                setSearchFilter({
                  ...searchFilter,
                  starRating: data.value || "",
                })
              }
              renderInput={(params) => (
                <TextField {...params} label="Star Rating" focused />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
