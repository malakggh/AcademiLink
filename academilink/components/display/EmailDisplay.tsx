import CopyDisplay from "./CopyDisplay";
import TextDisplay from "./TextDisplay";

export default function EmailDisplay({ email }: { email: string }) {
  return (
    <>
      <TextDisplay text={email} Icon={() => <CopyDisplay text={email} />} />
    </>
  );
}
