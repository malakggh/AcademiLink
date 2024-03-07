import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
const StudentSendSessionRequestDialog = ({
  mutate,
}: {
  mutate: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">{"שלח בקשה למתרגל"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="px-8">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex justify-items-stretch text-xl">
              <ExclamationTriangleIcon className="h-6 w-6 ml-4" />
              {"לא ניתן לבטל פעולה זו על ידי סטודנט"}
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xl text-right text-pretty">
            {
              "יש להגיש בקשות רק לאחר תקשורת ישירה עם המתגבר. עם הגשת בקשתך, מספר השעות שצוין יופחת מחשבונך. שעות אלו יוחזרו אליכם רק אם המתגבר יבטל את הבקשה מכל סיבה שהיא. אחרת, השעות המופחתות יועברו למתגבר."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-between w-full gap-4 flex-row-reverse">
            <AlertDialogCancel>{"בטל"}</AlertDialogCancel>
            <AlertDialogAction onClick={mutate}>{"שלח בקשה"}</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StudentSendSessionRequestDialog;
