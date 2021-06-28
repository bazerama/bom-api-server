const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/bom
 * Gets data from the Bureau of Meteorology website in JSON form
 */
router.options('/bom', cors());
router.post('/bom', async (req, res) => {
    fetch(req.body.url, {
        method: 'GET',
        headers: {
            // spoof user agent, BoM blocks requests from non-users at the moment
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/91.0.4472.114 Safari/537.36',
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        // reject not ok response
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json(); // or return response.text()
    }).catch(async (response) => {
        // handle error
        const error = await response.text().then(text => text);
        return Promise.reject(error);
    }).then((data) => {
        // return data
        res.send(data);
    }).catch((error) => {
        // return error
        res.status(503).json({ error });
    });
});

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

module.exports = router;
