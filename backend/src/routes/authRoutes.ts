import express from "express";
import { supabase } from "../utils/createSupabase.ts";

const router = express.Router();

router.post("/change-username", async (req, res) => {
  const { name, id } = req.body;

  if (!name || !id) res.status(400);

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ name })
      .eq("id", id);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "Username updated successfully", data });
  } catch (error) {
    console.log(error);
  }
});

export default router;
