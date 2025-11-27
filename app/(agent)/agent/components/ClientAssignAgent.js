"use client";

import { useSearchParams } from "next/navigation";
import Successfully from "../components/Successfully";

export default function ClientAssignAgent() {
  const searchParams = useSearchParams();
  const ticketNumber = searchParams.get("ticket");

  return <Successfully ticketNumber={ticketNumber} />;
}
