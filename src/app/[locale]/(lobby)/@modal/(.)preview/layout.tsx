import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export default function ModalLayout({ children }: React.PropsWithChildren) {
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogTitle className="sr-only">Command Dialog</AlertDialogTitle>
      <AlertDialogContent className="max-w-3xl overflow-hidden p-0">
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
}
