export async function getAPI(reqSearchParams, dbFunction) {
  try {
    const { data, error } = await dbFunction(reqSearchParams)
    if (error) throw new Error(error)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      statusText: error,
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

export async function postAPI(reqData, dbFunction) {
  try {
    const { data, error } = await dbFunction(reqData)
    if (error) throw new Error(error)
    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      statusText: error,
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

export async function invalidAccessTokenResponse(){
  return new Response(JSON.stringify({ message: "Invalid access token" }), {
    statusText: "Invalid access token",
    status: 500,
    headers: { "content-type": "application/json" },
  })
}