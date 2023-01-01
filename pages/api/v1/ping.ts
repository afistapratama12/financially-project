// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  response: string
  message: string
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    res.status(200).json({ response: "PONG", message: "server API NextJS successful running" })
  } catch (error) {
    res.status(500).json({ response: "ERROR", message: error.message })
  }

}
