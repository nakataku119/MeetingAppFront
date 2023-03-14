import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function TeamSelectForm() {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Team</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        label="Age"
      >
        <MenuItem value={10}>Team A</MenuItem>
        <MenuItem value={20}>Team B</MenuItem>
        <MenuItem value={30}>Team C</MenuItem>
      </Select>
    </FormControl>
  );
}
