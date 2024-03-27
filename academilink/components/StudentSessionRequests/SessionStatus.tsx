import type { $Enums } from "@prisma/client";
import { Badge } from "../ui/badge";
export default function SessionStatus({
  status,
}: {
  status: $Enums.StudentSessionRequestStatus;
}) {
  const statusMap = {
    PENDING: (
      <Badge className="text-base" variant="outline">
        {"עדיין לא התקיים"}
      </Badge>
    ),
    COMPLETED: (
      <Badge className="text-base" variant="default">
        {"התגבור התקיים"}
      </Badge>
    ),
    CANCELED: (
      <Badge className="text-base" variant="destructive">
        {"התגבור בוטל"}
      </Badge>
    ),
  };
  return <div>{statusMap[status]}</div>;
}
