import { CreateStudentForm } from "@/components/Student/Create/Forms/CreateStudentForm"

export default function NewStudentPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-6xl p-6">
        <h1 className="text-2xl font-bold mb-6">Create Student</h1>
        <CreateStudentForm />
      </div>
    </div>
  )
}
