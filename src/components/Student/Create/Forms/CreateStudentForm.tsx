"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createStudentValidation,
  StudentFormValues,
} from "../Validations/CreateStudentValidation";

export function CreateStudentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<StudentFormValues>({
    resolver: zodResolver(createStudentValidation),
    defaultValues: {
      role: "student", // default role
    },
  });

  // Mock teacher list (replace with API fetch later)
  const teachers = [
    { id: "t1", name: "Mr. Smith" },
    { id: "t2", name: "Ms. Johnson" },
    { id: "t3", name: "Dr. Brown" },
  ];

  async function onSubmit(values: StudentFormValues) {
    toast.promise(
      new Promise((resolve) =>
        setTimeout(() => {
          console.log("📩 Submitted:", values);
          resolve(values);
        }, 1200)
      ),
      {
        loading: "Saving student...",
        success: "Student created",
        error: "Failed to save student",
      }
    );
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 sm:grid-cols-2"
    >
      {/* Name */}
      <div className="sm:col-span-2">
        <Input placeholder="Student Name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Input placeholder="Phone" {...register("phone")} />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Roll Number */}
      <div>
        <Input placeholder="Roll Number" {...register("rollNumber")} />
        {errors.rollNumber && (
          <p className="text-red-500 text-sm">{errors.rollNumber.message}</p>
        )}
      </div>

      {/* Class */}
      <div>
        <Input placeholder="Class" {...register("className")} />
        {errors.className && (
          <p className="text-red-500 text-sm">{errors.className.message}</p>
        )}
      </div>

      {/* Section */}
      <div>
        <Input placeholder="Section" {...register("section")} />
        {errors.section && (
          <p className="text-red-500 text-sm">{errors.section.message}</p>
        )}
      </div>

      {/* Guardian Name */}
      <div>
        <Input placeholder="Guardian Name" {...register("guardian.name")} />
        {errors.guardian?.name && (
          <p className="text-red-500 text-sm">{errors.guardian.name.message}</p>
        )}
      </div>

      {/* Guardian Phone */}
      <div>
        <Input placeholder="Guardian Phone" {...register("guardian.phone")} />
        {errors.guardian?.phone && (
          <p className="text-red-500 text-sm">
            {errors.guardian.phone.message}
          </p>
        )}
      </div>

      {/* Guardian Relation */}
      <div>
        <Input
          placeholder="Guardian Relation"
          {...register("guardian.relation")}
        />
        {errors.guardian?.relation && (
          <p className="text-red-500 text-sm">
            {errors.guardian.relation.message}
          </p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <Input type="date" {...register("dateOfBirth")} />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
        )}
      </div>

      {/* Address + Assigned Teacher in same row */}
      <div className="sm:col-span-2 flex flex-col md:flex-row gap-4">
        {/* Address */}
        <div className="flex-1">
          <Input placeholder="Address" {...register("address")} />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Assigned Teacher */}
        <div className="w-full flex-1">
          <Select onValueChange={(val) => setValue("assignedTeacher", val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Teacher" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((teacher) => (
                <SelectItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.assignedTeacher && (
            <p className="text-red-500 text-sm">
              {errors.assignedTeacher.message}
            </p>
          )}
        </div>
      </div>

      {/* Role (hidden, default student) */}
      <input type="hidden" value="student" {...register("role")} />

      {/* Submit */}
      <div className="sm:col-span-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Student"}
        </Button>
      </div>
    </form>
  );
}
