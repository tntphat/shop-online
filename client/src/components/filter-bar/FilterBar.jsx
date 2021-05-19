import React from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Grid, Chip, makeStyles, Typography } from "@material-ui/core";
import { selectNameCategoryBySlug } from "../../redux/categories/category.selector";
import Menu from "../menu/menu";
import RangeSlider from "../range-slider/rangeSlider";
import arraySort from "./data-sort";
import { formatNumber } from "../../helpers/number";
import CloseIcon from "@material-ui/icons/Close";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
  chips: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function FilterBar({ max, selectNameCategoryBySlug, count }) {
  let query = useQuery();
  let history = useHistory();
  const classes = useStyles();

  const onChangeSort = (e) => {
    query.set("sort", e.target.value);
    history.replace({
      search: query.toString(),
    });
  };

  const categoryQuery = query.get("category");
  const sortQuery = query.get("sort");
  const fromQuery = query.get("from");
  const toQuery = query.get("to");

  const handleDelete = (queryField) => {
    const queryFieldArray = queryField.split(" ");
    if (queryFieldArray.length === 1) query.delete(queryField);
    else {
      queryFieldArray.forEach((field) => {
        query.delete(field);
      });
    }
    history.replace({
      search: query.toString(),
    });
  };

  const chips = [
    {
      queryValue: categoryQuery,
      label: selectNameCategoryBySlug(categoryQuery),
      query: "category",
    },
    {
      queryValue: sortQuery,
      label: arraySort[sortQuery - 1],
      query: "sort",
    },
    {
      queryValue: fromQuery,
      label: `${formatNumber(+fromQuery)} — ${formatNumber(+toQuery)}`,
      query: "from to",
    },
  ];

  const queryKw = query.get("kw");
  const handleClearQuery = () => {
    let newQuery = new URLSearchParams();
    if (queryKw) newQuery.set("kw", queryKw);
    history.replace({
      search: newQuery.toString(),
    });
  };

  return (
    <Grid container spacing={2}>
      {queryKw ? (
        <Grid item sm={12}>
          <Typography variant="h3">
            {count} results for “{queryKw}”
          </Typography>
        </Grid>
      ) : (
        <> </>
      )}
      <Grid item sm={9}>
        <RangeSlider max={max} />
      </Grid>

      <Grid item sm={3}>
        <Menu title="Sắp xếp" array={arraySort} onChange={onChangeSort} />
      </Grid>

      <Grid item sm={12} className={classes.chips}>
        {categoryQuery || sortQuery || fromQuery || toQuery ? (
          <Button
            onClick={handleClearQuery}
            variant="outlined"
            style={{ float: "right", marginRight: "0" }}
            startIcon={<CloseIcon />}
          >
            Xóa bộ lọc
          </Button>
        ) : (
          <> </>
        )}
        {chips.map((chip) => {
          if (chip.queryValue)
            return (
              <Chip
                key={chip.query}
                label={chip.label}
                onDelete={() => handleDelete(chip.query)}
                variant="outlined"
                color="secondary"
              />
            );
        })}
      </Grid>

      <Grid item sm={3}></Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  selectNameCategoryBySlug: (slug) => selectNameCategoryBySlug(slug)(state),
});

export default connect(mapStateToProps)(FilterBar);
