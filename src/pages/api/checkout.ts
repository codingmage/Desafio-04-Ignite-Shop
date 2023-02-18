import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const checkoutSession = await stripe
}
