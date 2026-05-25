import { handleCreateLink, handleGetAllLinks, handleGetLinkForUser, handleUpdateLinkForUser, updateFavorite, handleCreateShareLink, handleShareLink } from './link-helper.js';

export async function createLink(req, res) {
    try {
        const response = await handleCreateLink(req.body, req.user);

        return res.status(201).json({
            message : "Link is successfully Created",
            success : true,
            data : response
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to create link",
            success: false
        });
    }
}

export async function getAllLinks(req, res) {
    try {
        const response = await handleGetAllLinks(req.user);

        return res.status(200).json({
            message : "Links fetched Successfully",
            success : true,
            data : response
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch links",
            success: false
        });
    }
}

export async function getLinkById(req, res) {
    try {
        const { id } = req.params;
        const response = await handleGetLinkForUser(id);
        
        if (!response) {
            return res.status(404).json({
                message: "Link not found",
                success: false
            });
        }

        return res.status(200).json({
            message : "Link by Id is Fetched",
            success : true,
            data : response
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch link",
            success: false
        });
    }
}

export async function updateLink(req, res) {
    try {
        const { id } = req.params;
        const response = await handleUpdateLinkForUser(id, req.body);
        return res.status(200).json({
            message: "Link is successfully updated",
            success: true,
            data : response
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to update link",
            success: false
        });
    }
}

export async function updateFavoriteStatus(req, res) {
    try {
        const { id } = req.params;
        const { favorite } = req.body;
        const response = await updateFavorite(id, favorite);
        return res.status(200).json({
            message: "Favorite status is successfully updated",
            success: true,
            data : response
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to update favorite status",
            success: false
        });
    }
}

export async function createShareLink(req, res) {
    try {
        const { id } = req.params;
        const shareLink = await handleCreateShareLink(id);

        return res.status(200).json({
            message: "Share link is successfully generated",
            success: true,
            data : shareLink
        });
    } catch(error) {
        const statusCode = error.message === "Link not found" ? 404 : (error.message === "Sharing is not enabled for this link" ? 400 : 500);
        return res.status(statusCode).json({
            message: error.message || "Failed to generate share link",
            success: false
        });
    }
}


export async function getShareableLink(req, res) {
    try {
        const { shareHash } = req.params;
        const response = await handleShareLink(shareHash);

        if (!response) {
            return res.status(404).json({
                message: "Link not found or sharing is disabled",
                success: false
            });
        }

        return res.status(200).json({
            message: "Shared link retrieved successfully",
            success: true,
            data : response
        });
    } catch(error) {
        return res.status(500).json({
            message: error.message || "Failed to retrieve shared link",
            success: false
        });
    }
}