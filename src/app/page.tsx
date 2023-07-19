import { db } from '@/db'
import { users } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export default async function Home() {
  const allusers = await db.select().from(users)

  async function adduser(data: FormData) {
    'use server'

    const fullName = data.get('full_name')?.toString()
    const phone = data.get('phone')?.toString()

    const newUser = {
      fullName,
      phone,
    }

    if (fullName && phone) {
      await db.insert(users).values(newUser)
    }

    revalidatePath('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-900 text-zinc-50">
      <pre>{JSON.stringify(allusers, null, 2)}</pre>
      <form action={adduser} className="flex flex-col gap-3">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="bg-zinc-800 text-zinc-50 placeholder-zinc-600"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="bg-zinc-800 text-zinc-50 placeholder-zinc-600"
        />

        <button type="submit">Create</button>
      </form>
    </div>
  )
}
