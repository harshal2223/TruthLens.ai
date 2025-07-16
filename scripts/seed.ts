import { seedDatabase } from '../lib/sample-data'

async function main() {
  console.log('Starting database seeding...')
  await seedDatabase()
  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    process.exit(0)
  })
  