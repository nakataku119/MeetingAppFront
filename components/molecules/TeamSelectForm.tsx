import { Team } from "@/utils/types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Prop = {
  belongedTeam?: Team[];
};

export default function TeamSelectForm(props: Prop) {
  const { belongedTeam } = props;
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="belonged-team-select-label">Team</InputLabel>
      <Select
        labelId="belonged-team-select-label"
        id="belonged-team-select"
        label="Team"
      >
        {belongedTeam?.map((item: Team, index: number) => (
          <MenuItem key={index} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
