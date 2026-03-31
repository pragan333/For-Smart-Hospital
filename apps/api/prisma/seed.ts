import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create departments
  const departments = await Promise.all([
    prisma.department.create({ data: { name: "Emergency Room", code: "ER", floor: 1, building: "Main", capacity: 30 } }),
    prisma.department.create({ data: { name: "Intensive Care Unit", code: "ICU", floor: 2, building: "Main", capacity: 20 } }),
    prisma.department.create({ data: { name: "Cardiology", code: "CARD", floor: 3, building: "Main", capacity: 25 } }),
    prisma.department.create({ data: { name: "Pediatrics", code: "PED", floor: 4, building: "Main", capacity: 20 } }),
    prisma.department.create({ data: { name: "Orthopedics", code: "ORTH", floor: 3, building: "Wing B", capacity: 15 } }),
    prisma.department.create({ data: { name: "General Surgery", code: "SURG", floor: 2, building: "Wing B", capacity: 25 } }),
  ]);

  console.log(`  ✅ Created ${departments.length} departments`);

  // Create admin user
  const adminHash = await bcrypt.hash("admin123!", 12);
  const admin = await prisma.user.create({
    data: { email: "admin@smarthospital.com", passwordHash: adminHash, role: "ADMIN" },
  });

  // Create doctor and nurse users
  const doctorHash = await bcrypt.hash("doctor123!", 12);
  const nurseHash = await bcrypt.hash("nurse123!", 12);

  const doctorUsers = await Promise.all([
    prisma.user.create({ data: { email: "dr.smith@smarthospital.com", passwordHash: doctorHash, role: "DOCTOR" } }),
    prisma.user.create({ data: { email: "dr.jones@smarthospital.com", passwordHash: doctorHash, role: "DOCTOR" } }),
    prisma.user.create({ data: { email: "dr.patel@smarthospital.com", passwordHash: doctorHash, role: "DOCTOR" } }),
  ]);

  const nurseUsers = await Promise.all([
    prisma.user.create({ data: { email: "nurse.johnson@smarthospital.com", passwordHash: nurseHash, role: "NURSE" } }),
    prisma.user.create({ data: { email: "nurse.williams@smarthospital.com", passwordHash: nurseHash, role: "NURSE" } }),
    prisma.user.create({ data: { email: "nurse.garcia@smarthospital.com", passwordHash: nurseHash, role: "NURSE" } }),
  ]);

  console.log(`  ✅ Created ${1 + doctorUsers.length + nurseUsers.length} users`);

  // Create staff profiles
  const staffProfiles = await Promise.all([
    prisma.staff.create({ data: { userId: doctorUsers[0].id, employeeId: "DOC-001", firstName: "John", lastName: "Smith", role: "DOCTOR", specialization: "Emergency Medicine", departmentId: departments[0].id } }),
    prisma.staff.create({ data: { userId: doctorUsers[1].id, employeeId: "DOC-002", firstName: "Sarah", lastName: "Jones", role: "DOCTOR", specialization: "Cardiology", departmentId: departments[2].id } }),
    prisma.staff.create({ data: { userId: doctorUsers[2].id, employeeId: "DOC-003", firstName: "Raj", lastName: "Patel", role: "DOCTOR", specialization: "Pediatrics", departmentId: departments[3].id } }),
    prisma.staff.create({ data: { userId: nurseUsers[0].id, employeeId: "NRS-001", firstName: "Emily", lastName: "Johnson", role: "NURSE", departmentId: departments[0].id } }),
    prisma.staff.create({ data: { userId: nurseUsers[1].id, employeeId: "NRS-002", firstName: "Maria", lastName: "Williams", role: "NURSE", departmentId: departments[1].id } }),
    prisma.staff.create({ data: { userId: nurseUsers[2].id, employeeId: "NRS-003", firstName: "Ana", lastName: "Garcia", role: "NURSE", departmentId: departments[2].id } }),
  ]);

  console.log(`  ✅ Created ${staffProfiles.length} staff profiles`);

  // Create beds for each department
  const bedTypes = ["GENERAL", "ICU", "PEDIATRIC", "MATERNITY"] as const;
  let bedCount = 0;

  for (const dept of departments) {
    const bedsToCreate = dept.code === "ICU" ? 10 : dept.code === "ER" ? 15 : 8;
    const bedType = dept.code === "ICU" ? "ICU" : dept.code === "PED" ? "PEDIATRIC" : "GENERAL";

    for (let i = 1; i <= bedsToCreate; i++) {
      await prisma.bed.create({
        data: {
          bedNumber: `${dept.code}-${String(i).padStart(3, "0")}`,
          ward: `Ward ${dept.code}`,
          departmentId: dept.id,
          bedType,
          status: i <= Math.floor(bedsToCreate * 0.3) ? "OCCUPIED" : "AVAILABLE",
        },
      });
      bedCount++;
    }
  }

  console.log(`  ✅ Created ${bedCount} beds`);

  // Create sample patients
  const patients = await Promise.all([
    prisma.patient.create({ data: { mrn: "MRN-000001", firstName: "Alice", lastName: "Brown", dateOfBirth: new Date("1985-03-15"), gender: "FEMALE", contactPhone: "+1-555-0101", status: "ADMITTED", departmentId: departments[0].id } }),
    prisma.patient.create({ data: { mrn: "MRN-000002", firstName: "Bob", lastName: "Wilson", dateOfBirth: new Date("1972-07-22"), gender: "MALE", contactPhone: "+1-555-0102", status: "ADMITTED", departmentId: departments[1].id } }),
    prisma.patient.create({ data: { mrn: "MRN-000003", firstName: "Charlie", lastName: "Davis", dateOfBirth: new Date("2015-11-08"), gender: "MALE", contactPhone: "+1-555-0103", status: "REGISTERED", departmentId: departments[3].id } }),
    prisma.patient.create({ data: { mrn: "MRN-000004", firstName: "Diana", lastName: "Martinez", dateOfBirth: new Date("1990-01-30"), gender: "FEMALE", contactPhone: "+1-555-0104", status: "ADMITTED", departmentId: departments[2].id } }),
  ]);

  console.log(`  ✅ Created ${patients.length} patients`);

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📋 Login credentials:");
  console.log("  Admin:  admin@smarthospital.com / admin123!");
  console.log("  Doctor: dr.smith@smarthospital.com / doctor123!");
  console.log("  Nurse:  nurse.johnson@smarthospital.com / nurse123!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
