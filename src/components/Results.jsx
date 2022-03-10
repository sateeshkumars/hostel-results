import { useMemo } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";
import DisplayCard from "../components/DisplayCard";

export default function Results({
  holidays = [],
  searched,
  searchFilter = {},
}) {
  const holidaysMemo = useMemo(() => {
    const { hotelFacility, pricePerPerson, starRating } = searchFilter;
    if (!!holidays && holidays.length > 0) {
      return holidays.filter(
        (sr) =>
          (!hotelFacility ||
            sr?.hotel?.content.hotelFacilities.includes(hotelFacility)) &&
          (!pricePerPerson || sr.pricePerPerson <= pricePerPerson) &&
          (!starRating || starRating == sr?.hotel?.content.starRating)
      );
    }
    return [];
  }, [searchFilter, holidays]);

  return (
    <Grid
      container
      sx={{ justifyContent: "center", maxWidth: "100%" }}
      spacing={2}
    >
      {!holidaysMemo || holidaysMemo.length === 0 ? (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          {!searched ? "Please use search" : "No Results Found"}
        </Alert>
      ) : (
        <>
          {holidaysMemo.map((holiday, index) => (
            <DisplayCard
              hotel={holiday.hotel}
              pricePerPerson={holiday.pricePerPerson}
              key={index}
            />
          ))}
        </>
      )}
    </Grid>
  );
}
