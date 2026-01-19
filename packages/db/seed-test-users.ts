/**
 * Seed test users for authentication testing
 *
 * Creates test users with different roles:
 * - admin@test.com (owner role)
 * - manager@test.com (admin role)
 * - cashier@test.com (member role)
 *
 * Usage:
 * pnpm tsx packages/db/seed-test-users.ts
 */

import { db } from './index';
import { users, organizations, members } from './schema';
import { eq } from 'drizzle-orm';

const TEST_USERS = [
  {
    email: 'admin@test.com',
    name: 'Admin User',
    role: 'owner' as const,
  },
  {
    email: 'manager@test.com',
    name: 'Manager User',
    role: 'admin' as const,
  },
  {
    email: 'cashier@test.com',
    name: 'Cashier User',
    role: 'member' as const,
  },
];

async function seedTestUsers() {
  console.log('🌱 Seeding test users...\n');

  try {
    // Check if test organization exists, create if not
    const existingOrgs = await db
      .select()
      .from(organizations)
      .where(eq(organizations.name, 'Test Organization'))
      .limit(1);

    let testOrg;
    if (existingOrgs.length === 0) {
      console.log('Creating test organization...');
      const [newOrg] = await db
        .insert(organizations)
        .values({
          name: 'Test Organization',
          slug: 'test-org',
        })
        .returning();
      testOrg = newOrg;
      console.log(`✓ Created organization: ${testOrg.name} (${testOrg.id})\n`);
    } else {
      testOrg = existingOrgs[0];
      console.log(`✓ Using existing organization: ${testOrg.name} (${testOrg.id})\n`);
    }

    // Create test users
    for (const userData of TEST_USERS) {
      // Check if user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, userData.email))
        .limit(1);

      let user;
      if (existingUser.length === 0) {
        // Create user
        console.log(`Creating user: ${userData.email}...`);
        const [newUser] = await db
          .insert(users)
          .values({
            email: userData.email,
            name: userData.name,
            emailVerified: true,
          })
          .returning();
        user = newUser;
        console.log(`✓ Created user: ${user.email} (${user.id})`);
      } else {
        user = existingUser[0];
        console.log(`✓ User exists: ${user.email} (${user.id})`);
      }

      // Check if membership exists
      const existingMembership = await db
        .select()
        .from(members)
        .where(eq(members.userId, user.id))
        .where(eq(members.organizationId, testOrg.id))
        .limit(1);

      if (existingMembership.length === 0) {
        // Create membership
        await db.insert(members).values({
          organizationId: testOrg.id,
          userId: user.id,
          role: userData.role,
        });
        console.log(`  ✓ Added to organization with role: ${userData.role}`);
      } else {
        // Update role if different
        if (existingMembership[0].role !== userData.role) {
          await db
            .update(members)
            .set({ role: userData.role })
            .where(eq(members.userId, user.id))
            .where(eq(members.organizationId, testOrg.id));
          console.log(`  ✓ Updated role to: ${userData.role}`);
        } else {
          console.log(`  ✓ Membership exists with role: ${userData.role}`);
        }
      }
      console.log('');
    }

    console.log('✅ Test users seeded successfully!\n');
    console.log('🔑 To login, use magic link authentication:');
    console.log('   1. Go to /login');
    console.log('   2. Enter one of these emails:');
    TEST_USERS.forEach((u) => {
      console.log(`      - ${u.email} (${u.role})`);
    });
    console.log('   3. Check your email or development console for magic link\n');
  } catch (error) {
    console.error('❌ Error seeding test users:', error);
    process.exit(1);
  }

  process.exit(0);
}

seedTestUsers();
