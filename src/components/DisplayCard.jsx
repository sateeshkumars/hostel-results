import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import { Grid } from "@mui/material";

export default function DisplayCard({ hotel = {}, pricePerPerson = "" }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "8px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {!!hotel.name &&
              typeof hotel.name === "string" &&
              hotel.name[0].toUpperCase()}
          </Avatar>
        }
        title={hotel.name}
        subheader={`Price per person: ${
          !!pricePerPerson ? "$" + pricePerPerson : "NA"
        }`}
      />
      {hotel.content.images.length > 0 && (
        <CardMedia
          component="img"
          height="194"
          image={`https:${hotel.content.images[0].RESULTS_CAROUSEL.url}`}
          alt="Paella dish"
        />
      )}
      <CardContent>
        {hotel.content.starRating &&
          !isNaN(Number(hotel.content.starRating)) && (
            <Rating
              name="read-only"
              value={Number(hotel.content.starRating)}
              readOnly
            />
          )}
        <Grid spacing={1} sx={{ margin: "5px 0" }}>
          {hotel.content.hotelFacilities.map((label) => (
            <Chip
              label={label}
              size="small"
              sx={{ marginLeft: "5px", marginTop: "5px" }}
            />
          ))}
        </Grid>
        <Typography variant="body2" color="text.secondary">
          <div
            dangerouslySetInnerHTML={{ __html: hotel.content.hotelDescription }}
          />
        </Typography>
      </CardContent>
    </Card>
  );
}
