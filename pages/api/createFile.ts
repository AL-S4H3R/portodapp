import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default function handler(
    res: NextApiResponse,
    req: NextApiRequest
) {
    const code = req.body.code 
    fs.writeFile('contract.sol', code , (err) => {
        if(err) {
            res.json({ err })
        }
        res.status(400).json({
            msg: 'Created contract file'
        })
    })
}