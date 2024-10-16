export default async function handleUpdateProfile(data: Record<string, any>) {
  const response = await fetch("/api/account", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  })

  if (!response.ok) {
    throw new Error("Failed to update profile")
  }

  return { status: 200, message: "Successful!" }
}
