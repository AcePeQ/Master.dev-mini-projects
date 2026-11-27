export async function fetchRooms(criteria) {
  const params = new URLSearchParams(criteria);

  const res = await fetch(`http://127.0.0.1:4173/api/rooms?${params.toString()}`, {
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Błąd HTTP! Status ${res.status}`)
  }

  const data = await res.json();

  return data.rooms;
}
