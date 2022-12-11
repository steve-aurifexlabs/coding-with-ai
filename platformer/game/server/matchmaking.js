
// Create and express.js server that handles thr routes above.
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { matchmaking } from './matchmaking';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/matchmaking', (req, res) => {
    const playerId = req.query.playerId;
    const match = matchmaking.getMatch(playerId);
    res.json(match);
});

app.post('/matchmaking/start', (req, res) => {
    const playerId = req.body.playerId;
    const match = matchmaking.startMatch(playerId);
    res.json(match);
});

app.post('/matchmaking/leave', (req, res) => {
    const playerId = req.body.playerId;
    const match = matchmaking.leaveMatch(playerId);
    res.json(match);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});

class MatchMaking {
    constructor() {
        this.matches = [];
    }

    getMatch(playerId) {
        let match = null;
        this.matches.forEach((m) => {
            if (m.players.find((p) => p.id === playerId)) {
                match = m;
            }
        });
        if (!match) {
            match = {
                id: this.matches.length,
                players: [],
            };
            this.matches.push(match);
        }
        return match;
    }

    startMatch(playerId) {
        const match = this.getMatch(playerId);
        if (match.players.length === 4) {
            match.started = true;
        }
        return match;
    }

    leaveMatch(playerId) {
        const match = this.getMatch(playerId);
        if (match) {
            match.players = match.players.filter((p) => p.id !== playerId);
        }
        return match;
    }
}

export const matchmaking = new MatchMaking();