const {Router} = require('express')
const router = Router()
const axios = require('axios')
const token = process.env.WEBINARJAM_TOKEN

const instance = axios.create({
    baseURL: 'https://api.webinarjam.com',
    headers: {
        'Content-Type': 'application/json'
    }
  })

router.post('/get-schedules', async (req, res) => {
    try {
      const webinarId = req.body.webinarId
      const timezone = req.body.timezone
      const schedules = await instance.post(`https://api.webinarjam.com/everwebinar/webinar`, {
        api_key: token,
        webinar_id: webinarId,
        timezone: timezone
      })
      res.status(200).json(schedules.data)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/register', async (req, res) => {
    try {
        const {email, name, schedule, webinarId, timezone} = req.body
        const register = await instance.post(`https://api.webinarjam.com/everwebinar/register`, {
            api_key: token,
            webinar_id: webinarId,
            first_name: name,
            email: email,
            schedule,
            timezone
        })
        console.log(register)
        res.status(200).json(register.data)
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router