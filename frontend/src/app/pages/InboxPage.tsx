import { CreateTodo } from "@/features/todo/components/CreateTodo";

export function InboxPage() {
  return (
    <>
      <h1 className="mb-4">Inbox</h1>
      <CreateTodo />
    </>
  );
}
