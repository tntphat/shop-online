import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./search.styles";

export default function SearchBar() {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        // value={searchValue}
        // onChange={(e) => setSearchValue(e.target.value)}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}
