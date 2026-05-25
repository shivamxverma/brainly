import { handleCreateLink } from './link-helper.js';

export function createLink(req, res) {
    const response = handleCreateLink(req.body);

    return res.status(201).json({
        message : "Link is successfully Created",
        success : true
    })
}