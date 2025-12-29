import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPaste } from "../api";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    fetchPaste(id).then(setPaste).catch(() => setPaste("404"));
  }, [id]);

  if (paste === "404") return <h1>Paste not found</h1>;
  if (!paste) return null;

  return <pre>{paste.content}</pre>;
}
