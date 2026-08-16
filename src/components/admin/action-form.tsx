import { ReactNode } from "react";

interface ActionFormProps {
  action: (formData: FormData) => void | Promise<void>;
  children: ReactNode;
}

export default function ActionForm({ action, children }: ActionFormProps) {
  return <form action={action}>{children}</form>;
}
