export function normalizeRooms(rawRooms) {
  const newRooms = rawRooms.map(room => {
    const { id,
      name: title,
      location: { city, district },
      capacity,
      pricing: { hourly: hourlyRate },
      features
    } = room;

    return {
      id,
      title,
      city,
      district,
      capacity,
      hourlyRate,
      features
    }
  })

  return newRooms;
}
