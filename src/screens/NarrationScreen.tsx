import { useState, useEffect } from "react";
import { Box, Grid, Stack } from "@mui/material"; // system
import { narration, getCharacterById, CharacterBaseModel } from "@drincs/pixi-vn";

export default function NarrationScreen() {
  const [dialogue, setDialogue] = useState(narration.dialogue);
  const [newText, setNewText] = useState(dialogue?.text);
  const [newCharacter, setNewCharacter] = useState<CharacterBaseModel | undefined>();

  useEffect(() => {
    const updateDialogue = () => {
      const newDialogue = narration.dialogue;
      setDialogue(newDialogue);
      setNewText(newDialogue?.text);

      let character = newDialogue?.character
        ? getCharacterById(newDialogue.character)
        : undefined;
      if (!character && newDialogue?.character) {
        character = new CharacterBaseModel(newDialogue.character, {
          name: newDialogue.character,
        });
      }
      setNewCharacter(character);
    };
  }, [narration]);

  return (
    <Stack
      direction="column"
      spacing={0}
      sx={{
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {newText && (
        <Box
          sx={{
            pointerEvents: "auto",
            backgroundColor: "white",
            color: "black",
            borderWidth: "0px",
            height: "30%",
            width: "100%",
          }}
        >
          <Stack
            direction="column"
            spacing={0}
            sx={{
              justifyContent: "flex-end",
              alignItems: "flex-start",
              height: "100%",
              width: "100%",
            }}
          >
            {newCharacter?.name && (
              <div style={{ marginLeft: "10px" }}>
                {newCharacter.name + (newCharacter.surname ? " " + newCharacter.surname : "")}
              </div>
            )}
            <Grid
              container
              direction="row"
              sx={{
                overflow: "auto",
                height: "100%",
              }}
            >
              {newCharacter?.icon && (
                <Grid item xs={2}>
                  <img
                    src={newCharacter?.icon}
                    loading="lazy"
                    alt=""
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={newCharacter?.icon ? 10 : 12}>
                <Box>{newText}</Box>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
