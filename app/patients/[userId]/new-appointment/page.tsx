import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.action";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  let patient;
  try {
    patient = await getPatient(userId);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return (
      <div className="flex h-screen max-h-screen items-center justify-center">
        <p className="text-xl text-red-500">
          Patient not found or an error occurred.
        </p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex h-screen max-h-screen items-center justify-center">
        <p className="text-xl text-red-500">
          Patient not found or an error occurred.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-100 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <p className="copyright mt-10 py-4">© 2024 CarePulse</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
