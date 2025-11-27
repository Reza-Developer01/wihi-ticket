"use client";

import { useSearchParams } from "next/navigation";
import SuccessfullyStatus from "./SuccessfullyStatus";

export default function ChangeStatusClient() {
  const searchParams = useSearchParams();
  const ticketNumber = searchParams.get("ticket");

  return <SuccessfullyStatus ticketNumber={ticketNumber} />;
}
