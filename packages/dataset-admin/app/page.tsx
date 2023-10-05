import PokeList from '@/components/pkm/poke-list'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <PokeList />
    </main>
  )
}
