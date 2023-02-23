// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
    try {
        if(req.method === 'POST'){
            res.status(200).json({ ...req.body,...req.query })
        }
        res.redirect(307, '/404')
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}
