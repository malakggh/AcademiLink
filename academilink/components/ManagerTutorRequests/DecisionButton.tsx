import { tutorRequestObjectNotNullableType } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";

const DecisionButton = ({
  request,
  accept,
}: {
  request: tutorRequestObjectNotNullableType;
  accept: boolean;
}) => {
  const { mutate } = useMutation({});
  return <div>DecisionButton</div>;
};

export default DecisionButton;
