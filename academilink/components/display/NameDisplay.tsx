import { PersonIcon } from "@radix-ui/react-icons";
import TextDisplay from "./TextDisplay";
export default function NameDisplay({ name }: { name: string }) {
  return (
    <>
      <TextDisplay
        text={name}
        Icon={() => <PersonIcon className="h-5 w-5 ml-4" />}
      />
    </>
  );
}
