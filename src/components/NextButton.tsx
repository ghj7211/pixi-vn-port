import { narration } from "@drincs/pixi-vn";
import { useState } from "react"

export default function NextButton() {
  const [loading, setLoading] = useState(false);

  async function nextOnClick(): Promise<void> {
    try {
      if (!narration.canGoNext) {
        return;
      }
      setLoading(true);
      narration
        .goNext({})
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {
      console.error(e);
    }
  }

  if (!narration.canGoNext) {
    return null;
  }

  return (
    <button
      onClick={nextOnClick}
      disabled={loading}
      style={{
        width: 40,
        height: 20,
        pointerEvents: "auto",
      }}
    >
      Next
    </button>
  );
}
