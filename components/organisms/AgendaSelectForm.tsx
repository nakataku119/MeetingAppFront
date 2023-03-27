import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

type Prop = {
  onChange: (agenda: string) => void;
  disabled: boolean;
  checkedAgendas: Array<string>;
};

export default function AgendaSelectFrom(props: Prop) {
  const agendas = [
    "業務に関して",
    "人間関係",
    "心身の状態",
    "今後のキャリア",
    "プライベート",
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography component="h1" sx={{ width: "100%", fontSize: 5 }}>
        Agenda
      </Typography>
      {agendas.map((agenda: string, index: number) => (
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => props.onChange(event.target.value)}
              value={agenda}
              color="primary"
              disabled={props.disabled}
              checked={props.checkedAgendas.includes(agenda)}
            />
          }
          label={agenda}
          key={index}
        />
      ))}
    </Box>
  );
}
