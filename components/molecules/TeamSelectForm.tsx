import { Team } from "@/utils/types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Prop = {
  belongedTeam?: Team[];
  initialValue?: Team;
  onSelectTeam: (team: Team) => void;
};

export default function TeamSelectForm(props: Prop) {
  const { belongedTeam, onSelectTeam } = props;
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="belonged-team-select-label">Team</InputLabel>
      <Select
        labelId="belonged-team-select-label"
        id="belonged-team-select"
        label="Team"
        disabled={Boolean(props.initialValue)}
        value={props.initialValue?.name}
      >
        {belongedTeam?.map((item: Team, index: number) => (
          <MenuItem
            key={index}
            value={item.name}
            onClick={() => onSelectTeam(item)}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
